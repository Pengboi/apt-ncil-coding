#!/usr/bin/env python3
import http.server, json, urllib.request, os, sys, re

env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '.env')
if os.path.exists(env_path):
    with open(env_path) as f:
        for line in f:
            line = line.strip()
            if '=' in line and not line.startswith('#'):
                k, v = line.split('=', 1)
                os.environ.setdefault(k.strip(), v.strip())

API_KEY = os.environ.get('GEMINI_API_KEY')
MODEL = 'gemma-4-26b-a4b-it'
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8080

def clean_reply(text):
    for sep in ['---', 'Final Answer:', 'Final answer:']:
        if sep in text:
            text = text.split(sep)[-1]
    lines = [l.strip() for l in text.split('\n') if l.strip()]
    no_bullet = [l for l in lines if not l.startswith('*') and not l.startswith('-') and not l.startswith('•')]
    for candidate in reversed(no_bullet):
        if len(candidate) > 20:
            candidate = re.sub(r'^["\']|["\']$', '', candidate)
            return candidate
    return lines[-1] if lines else text

class Handler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/api/chat':
            length = int(self.headers['Content-Length'])
            body = json.loads(self.rfile.read(length))
            msg = body.get('message', '')
            
            payload = json.dumps({
                'system_instruction': {'parts': [{'text': 'Answer directly and concisely. Do not show your reasoning or thought process. Just give the final answer.'}]},
                'contents': [{'parts': [{'text': msg}]}]
            }).encode()
            
            url = f'https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={API_KEY}'
            req = urllib.request.Request(url, data=payload, headers={'Content-Type': 'application/json'})
            
            try:
                with urllib.request.urlopen(req) as resp:
                    data = json.loads(resp.read())
                raw = data.get('candidates', [{}])[0].get('content', {}).get('parts', [{}])[0].get('text', '')
                reply = clean_reply(raw)
                self.send_json({'reply': reply})
            except urllib.error.HTTPError as e:
                err = json.loads(e.read())
                self.send_json({'error': err.get('error', {}).get('message', str(e))}, 500)
        else:
            self.send_error(404)
    
    def send_json(self, data, status=200):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())
    
    def log_message(self, format, *args):
        msg = ' '.join(str(a) for a in args) if args else format
        print(f'[{self.log_date_time_string()}] {msg}')

if __name__ == '__main__':
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    print(f'Serving at http://localhost:{PORT}')
    print(f'Model: {MODEL}')
    http.server.HTTPServer(('0.0.0.0', PORT), Handler).serve_forever()
