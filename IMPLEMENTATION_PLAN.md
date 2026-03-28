# Dazziling Dog Groomers - Implementation Plan

## Project Status: Week 1 Complete ✅

**Current State:**
- Single-page scrolling website with clean design
- Baby blue color theme applied
- Hero section with Unsplash image
- Services section streamlined (3 main cards + add-ons)
- Team section removed for cleaner look
- FAQ and Blog sections removed
- Navigation with smooth scroll

---

## Week 2: Advanced Booking System 🎯

### Core Requirements

#### 1. Booking Page Structure
- **Route:** `/booking`
- **Design:** Match baby blue theme from main site
- **Storage:** JSON file for POC (simple but persistent)
- **Time Slots:** 1-hour blocks (adjustable per service)

#### 2. User Flow
```
1. Select Service
   ↓
2. View Calendar (Month view)
   ↓
3. Click Date → See Available Time Slots
   ↓
4. Select Time Slot
   ↓
5. Enter Customer Details
   ↓
6. Pay Deposit
   ↓
7. Confirmation
```

#### 3. Calendar Features
- **Month View:** See entire month at a glance
- **Visual Indicators:**
  - Green = Available slots
  - Red = Fully booked
  - Grey = Blocked (emergency/unavailable)
  - Blue = User's selected date
- **Day Selection:** Click day to expand time slots
- **Time Display:** Grid/timeline view (9:00, 10:00, 11:00...)

#### 4. Service Durations
| Service | Duration | Base Price |
|---------|----------|------------|
| Full Grooming | 2 hours | £45-75 |
| Bath & Brush | 1 hour | £25-40 |
| Puppy Package | 1.5 hours | £30-45 |
| Nail Trim Only | 30 min | £12 |
| (Add-ons) | +15-30 min | Varies |

#### 5. Availability Logic
- **Simultaneous Bookings:** 1 dog at a time (single groomer)
- **Buffer Time:** 15 minutes between appointments
- **Working Hours:** 9:00 AM - 6:00 PM (Mon-Sat)
- **Slot Calculation:** Show only slots where full duration fits

---

### Advanced Features

#### 6. Deposit System 💰
**Options:**
- **A) Fixed:** £10 flat deposit
- **B) Percentage:** 20% of service cost
- **C) Full:** 100% upfront (refundable per policy)

**Implementation:**
- Mock payment for POC
- Can integrate Stripe later
- Store payment status in JSON

#### 7. Cancellation Policy 🚫
**Timeframes:**
- **> 24 hours:** Full refund
- **12-24 hours:** 50% refund (keep deposit)
- **< 12 hours:** No refund

**Logic:**
- Free up slot immediately on cancellation
- Update calendar availability
- Record cancellation reason (optional)

#### 8. Emergency Management 🆘
**Features:**
- Admin can block any day (emergency/unavailable)
- Blocked days show as grey on calendar
- Existing appointments on blocked days must be:
  - Automatically rescheduled to next available slot
  - OR marked for manual rescheduling

**Rescheduling Logic:**
- Find next available slot (same time if possible)
- Send notification to customer
- Update booking records

#### 9. Data Structure (JSON)

```json
{
  "bookings": [
    {
      "id": "booking-001",
      "customer": {
        "name": "John Smith",
        "email": "john@email.com",
        "phone": "02012345678"
      },
      "dog": {
        "name": "Buddy",
        "breed": "Golden Retriever",
        "size": "large"
      },
      "service": {
        "id": "full-grooming",
        "name": "Full Grooming Package",
        "duration": 120,
        "price": 65
      },
      "datetime": "2024-04-15T10:00:00",
      "deposit": {
        "amount": 13,
        "paid": true,
        "paymentId": "pay-001"
      },
      "status": "confirmed",
      "notes": "First time customer, nervous around scissors"
    }
  ],
  "blockedDays": [
    {
      "date": "2024-04-20",
      "reason": "Emergency - vet appointment",
      "rescheduledBookings": ["booking-005"]
    }
  ],
  "settings": {
    "workingHours": {
      "start": "09:00",
      "end": "18:00"
    },
    "bufferMinutes": 15,
    "depositType": "percentage",
    "depositValue": 20,
    "cancellationHours": 24
  }
}
```

---

### UI Components Needed

#### Booking Page Sections:
1. **Service Selector**
   - Cards with service info
   - Price and duration displayed
   - One-click selection

2. **Calendar Component**
   - Month navigation (prev/next)
   - Day grid with status colors
   - Selected date highlight
   - Legend explaining colors

3. **Time Slot Grid**
   - List or grid of available times
   - Visual distinction for booked vs free
   - Service duration preview

4. **Booking Form**
   - Customer details (name, email, phone)
   - Dog details (name, breed, size, notes)
   - Special requirements
   - Deposit payment section

5. **Confirmation Screen**
   - Booking summary
   - Calendar invite option (mock)
   - Cancellation policy reminder
   - Return to home button

#### Admin Dashboard (Optional for POC):
- View all bookings
- Block/unblock days
- Manage cancellations
- Emergency rescheduling

---

### Technical Implementation

#### File Structure:
```
app/
├── page.tsx (main site - DONE)
├── layout.tsx (shared layout - DONE)
├── globals.css (baby blue theme - DONE)
├── booking/
│   └── page.tsx (booking interface)
├── api/
│   └── bookings/
│       └── route.ts (API endpoints)
├── components/
│   ├── BookingCalendar.tsx
│   ├── ServiceSelector.tsx
│   ├── TimeSlots.tsx
│   └── BookingForm.tsx
├── lib/
│   └── bookingData.ts (JSON operations)
└── data/
    └── bookings.json (storage file)
```

#### Dependencies Needed:
```bash
# Already have:
# - next
# - react
# - framer-motion
# - shadcn/ui
# - tailwindcss

# May need:
# - date-fns (date manipulation)
# - react-calendar or custom calendar
```

---

### Week 2 Task Breakdown

#### Day 1: Setup & Basic Structure
- [ ] Create `/booking` page
- [ ] Set up JSON data structure
- [ ] Build ServiceSelector component
- [ ] Basic layout with baby blue theme

#### Day 2: Calendar Component
- [ ] Build month view calendar
- [ ] Day selection logic
- [ ] Visual status indicators (colors)
- [ ] Navigation (prev/next month)

#### Day 3: Time Slots & Booking Logic
- [ ] Generate time slots
- [ ] Check availability against JSON data
- [ ] Handle different service durations
- [ ] Display available times

#### Day 4: Booking Form & Deposit
- [ ] Customer details form
- [ ] Dog information form
- [ ] Mock payment interface
- [ ] Confirmation screen

#### Day 5: Advanced Features
- [ ] Cancellation logic
- [ ] Emergency day blocking
- [ ] Auto-rescheduling
- [ ] Testing & polish

---

### Key Decisions to Make Before Building

1. **Deposit Amount:** Fixed £10 or percentage?
2. **Cancellation Window:** 24 hours or 48 hours?
3. **Payment:** Mock only or real Stripe integration?
4. **Admin Access:** Simple password or separate admin page?
5. **Notifications:** Email confirmations needed for POC?

---

### Notes

- Keep it functional but simple for POC
- Focus on core booking flow first
- Add deposit/policies after basic booking works
- Mobile responsive essential
- Accessible (keyboard navigation, screen readers)
- Can always add real database later

---

## Questions for Next Week

1. Which deposit option? (Fixed/Percentage/Full)
2. Cancellation timeframe preference?
3. Any specific styling beyond baby blue theme?
4. Do you want email notifications for POC?
5. Should we include a simple admin view?

---

**Ready to build when you say the word! 🐕💙📅**
