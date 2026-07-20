#!/bin/bash

# Eternal Blooms Photo Organization Script
# Run this after adding your flower photos to rename them automatically

echo "🌹 Eternal Blooms Photo Organizer 🌹"
echo "===================================="
echo ""

# Check if photos exist
count=$(ls -1 *.jpg *.jpeg *.png *.webp *.HEIC 2>/dev/null | wc -l)

if [ "$count" -eq 0 ]; then
    echo "❌ No photos found!"
    echo ""
    echo "Please add your flower photos to this folder first:"
    echo "  Session 4/The Engineers/eternal-flowers/public/images/"
    echo ""
    echo "Then run this script again."
    exit 1
fi

echo "Found $count photo(s)"
echo ""
echo "Please identify each photo by number:"
echo ""

# Show all photos with numbers
ls -1 *.jpg *.jpeg *.png *.webp *.HEIC 2>/dev/null | nl -ba

echo ""
echo "========================================="
echo "PHOTO IDENTIFICATION GUIDE:"
echo "========================================="
echo ""
echo "1. Blue 'I ❤️ U' Letter Box         →  blue-letter-box.jpg"
echo "2. Pink Bouquet (Thank You card)   →  pink-thankyou-bouquet.jpg"
echo "3. Blue Wrapped Bouquet            →  blue-bouquet-elegant.jpg"
echo "4. Red Birthday + Tiara + Ribbon   →  red-birthday-bouquet.jpg"
echo "5. Red Heart Box                   →  red-valentine-heart.jpg"
echo "6. Blue Roses Close-up             →  blue-roses-detail.jpg"
echo "7. Purple Flower Purse             →  purple-flower-purse.jpg"
echo "8. Purple Letter Box               →  purple-letter-box.jpg"
echo "9. Pink 15th Birthday Bouquet      →  pink-birthday-bouquet.jpg"
echo "10. Red 13th Birthday Close-up     →  red-birthday-detail.jpg"
echo "11. Girl Holding Bouquet           →  birthday-girl-bouquet.jpg"
echo ""

read -p "Press Enter to continue with manual renaming guide..."

echo ""
echo "✅ MANUAL RENAMING INSTRUCTIONS:"
echo "================================="
echo ""
echo "Use these commands to rename your photos:"
echo ""
echo "mv 'your-photo-1.jpg' 'blue-letter-box.jpg'"
echo "mv 'your-photo-2.jpg' 'pink-thankyou-bouquet.jpg'"
echo "mv 'your-photo-3.jpg' 'blue-bouquet-elegant.jpg'"
echo "mv 'your-photo-4.jpg' 'red-birthday-bouquet.jpg'"
echo "mv 'your-photo-5.jpg' 'red-valentine-heart.jpg'"
echo "mv 'your-photo-6.jpg' 'blue-roses-detail.jpg'"
echo "mv 'your-photo-7.jpg' 'purple-flower-purse.jpg'"
echo "mv 'your-photo-8.jpg' 'purple-letter-box.jpg'"
echo "mv 'your-photo-9.jpg' 'pink-birthday-bouquet.jpg'"
echo "mv 'your-photo-10.jpg' 'red-birthday-detail.jpg'"
echo "mv 'your-photo-11.jpg' 'birthday-girl-bouquet.jpg'"
echo ""
echo "✨ After renaming, run: npm run dev"
echo "   Your website will display the real photos!"
