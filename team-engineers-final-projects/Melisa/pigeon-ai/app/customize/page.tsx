import PigeonCustomizer from '../components/PigeonCustomizer';

export const metadata = {
  title: 'Customize Your PigeonBot 🤖',
  description: 'Personalize your PigeonBot AI companion - choose colors, size, personality, and accessories.',
};

export default function CustomizePage() {
  return (
    <div className="customize-page">
      <div className="customize-header">
        <div className="container">
          <div className="badge mb-4">
            <span>🎨</span>
            <span>Customize</span>
          </div>
          <h1 className="text-4xl font-bold">
            Design Your <span className="text-gradient">Perfect Pigeon</span>
          </h1>
          <p className="text-muted max-w-2xl mx-auto mt-4">
            Personalize every detail of your PigeonBot companion. Choose colors, size, personality, and fun accessories to make it uniquely yours!
          </p>
        </div>
      </div>

      <div className="container">
        <PigeonCustomizer />
      </div>
    </div>
  );
}
