# Design Spec: Direct Booking (Option B) & UI/UX Pro Max Optimization

## 1. Goal
Transition the ElevateCSM platform from a high-friction "Contact Form" approach to a zero-friction "Direct Booking & WhatsApp" approach, while strictly enforcing the `ui-ux-pro-max` guidelines across all interface components.

## 2. Approach: Calendly & WhatsApp Integration (Option B)
- **Primary CTA Refactor:** Change text from "Work with us" (Trabaja con nosotros) to "Book your Free Discovery Call" (Agenda tu Llamada Gratuita).
- **Contact Section Replacement:** 
  - Remove standard email/message fields.
  - Insert two primary paths:
    1. **Calendly Embed:** Direct modal/inline calendar to lock in video calls automatically.
    2. **WhatsApp Direct Link:** An instant secondary button (`wa.me/` link) with a pre-filled message stating: "Hi ElevateCSM team, I'd like to scale my brand's social media..."
  
## 3. UI/UX Pro Max Optimizations

### Accessibility (Priority 1)
- **Contrast Ratios:** Ensure the `agency-gray` (#7F817D) meets the 4.5:1 ratio against the `agency-dark` (#2B2E31) background. If not, brighten the gray or use `agency-cream` for text that needs reading.
- **Focus States:** Add `focus-visible:ring-2 focus-visible:ring-agency-cream focus-visible:outline-none` to all interactive elements (buttons, nav links, language toggles).
- **Aria Labels:** Add `aria-label` to social media icons in the footer and the mobile menu toggle button.

### Touch & Interaction (Priority 2)
- **Target Sizes:** Ensure all buttons and links are at least `44x44px` for touch accuracy on mobile.
- **Tap Feedback:** Wrap primary buttons with `framer-motion`'s `whileTap={{ scale: 0.95 }}` so users physically feel the click registering immediately (150-300ms timing).
- **Hover Dependency:** Ensure no critical flow relies exclusively on CSS `:hover` since Mobile devices don't have hover.

### Performance (Priority 3)
- **Image Optimization:** Ensure the generated AI hero background and video placeholders are eagerly loaded and properly scaled.
- **Motion Handling:** Respect OS-level reduced motion preferences using Framer Motion's `useReducedMotion` hook.

### Typography & Layout (Priority 5 & 6)
- **Typography Hierarchy:** Standardize heading weights (Extrabold for H1, Bold for H2/H3, Light for description text). 
- **Spacing System:** Ensure all paddings and margins adhere strictly to an 8pt grid (`p-8`, `mb-16`, `gap-8`).

## 4. Open Questions & User Review
- Do you prefer embedding the Calendly widget directly on the page, or having the CTA open Calendly in a beautiful popup/new tab?
- Do you have a specific WhatsApp Business number ready to link?

*Status: Pending User Review*
