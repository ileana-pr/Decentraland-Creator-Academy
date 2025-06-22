Here’s a polished version of your Decentraland Venue Starter Kit README with improved clarity, formatting, and structure—while preserving your original intent and technical precision:

---

# 🎉 Decentraland Venue Starter Kit

Welcome to the **Decentraland Venue Starter Kit** — a plug-and-play scene template designed to jumpstart the creation of your own virtual club, gallery, or event space. Built on **M1D Components**, it delivers powerful features while letting you focus on what matters most: your creativity.

This scene comes pre-configured with a **network-synced video screen** and a **vibrant animated dance floor**, making it the perfect foundation for a polished, functional venue—no need to start from scratch.

---

## 🧩 Features at a Glance

- **VideoGuide Component**  
  A fully integrated video system that connects to a shared content network. It includes a user-friendly channel selector UI and supports synchronized playback across scenes using the same component.

- **CurvedScreen Component**  
  A procedurally generated curved display optimized for immersive viewing.

- **Animated Dance Floor**  
  An eye-catching shader-powered floor that cycles through a pastel palette to energize your space.

- **Single Parcel Layout**  
  Clean, optimized geometry designed to perfectly fit a 16x16m parcel.

---

## ⚙️ Quick Start Guide

Follow these steps to get up and running in minutes:

1. **Download or Fork** this repository.  
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run the scene locally**:
   ```bash
   dcl start
   ```

Boom! You’ll be looking at a fully functional scene with a working video player and UI.

---

## 🧠 Core Logic – `src/index.ts`

The heart of the scene is beautifully simple, powered by two function calls from the `@m1d/dcl-components` library:

```ts
import { createCurvedScreen, createVideoGuide } from '@m1d/dcl-components';

export async function main() {
  const videoGuide = await createVideoGuide();

  createCurvedScreen({
    position: Vector3.create(8, 0, 8),
    rotation: Quaternion.fromEulerDegrees(0, 0, 0),
    scale: Vector3.create(1, 1, 1),
    videoTexture: videoGuide.videoTexture
  });

  // Additional assets like the ground and dance floor load here...
}
```

---

## ✏️ Customization

Make the scene your own:

- **Swap Models**: Replace `ground1Parcel.glb` or `DF_WithSpinning_Shuffle_Float2.glb` with your own.
- **Reposition Elements**: Tweak `position`, `rotation`, or `scale` values in `src/index.ts`.
- **Add Logic & Interactives**: Expand `main()` with your own code, models, or behavior.

This kit gives you the foundation—you bring the vision.

---

## 🤝 Support & Community

This starter kit is brought to you by **M1D**, dedicated to empowering Decentraland creators.

Join the community for help, updates, and creative inspiration:  
👉 **[M1D Discord](https://discord.gg/FnVxT8cVd2)**

Build boldly. Dance freely. Create something unforgettable.  

---

If you’d like a separate developer-facing version or a one-pager for non-technical stakeholders, I can help with that too.
