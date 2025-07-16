// =============================================================================
// Welcome to the Decentraland Venue Starter Kit!
//
// This `index.ts` file is the main entry point for your scene.
// It's where you'll load models, create interactive elements,
// and set up the core functionality.
//
// We've commented everything in detail to help you get started.
// =============================================================================

import { Animator, engine, GltfContainer, Material, MeshCollider, MeshRenderer, Transform } from '@dcl/sdk/ecs';
import { Vector3, Quaternion, Color3 } from '@dcl/sdk/math';

// Import the pre-packaged components from the M1D Components Library.
// These components handle all the complex logic for video playback and UI.
import { createCurvedScreen, createVideoGuide } from '@m1d/dcl-components';

/**
 * The main function is the primary entry point for the scene's execution.
 * It is marked as `async` because it needs to wait for the VideoGuide component to initialize.
 */
export async function main() {

    // =============================================================================
    // --- VIDEO SYSTEM SETUP ---
    // This is the core of the venue's media functionality.
    // =============================================================================

    // --- Initialize the M1D Relay ---
    // This single call now handles fetching, fallback, UI, and the scheduler.
    // The local playlist is defined directly inside the function call for conciseness.
  const videoGuide = await createVideoGuide({
    localVideo: {
      id: 'local-video', // Unique identifier for the local video
      src: 'https://player.vimeo.com/external/902624555.m3u8?s=b2b78debfef94d115dd5c00a76d633e863786372&logging=false',
      socialsLink: 'https://www.m1d.io', 
    }
  });

    // Create the physical screen that will display the video.
    // This uses the `createCurvedScreen` component from the library.
    createCurvedScreen({
        // --- How to Customize the Screen ---
        // position: The location of the screen in the scene. Vector3.create(X, Y, Z).
        // rotation: The orientation of the screen. Quaternion.fromEulerDegrees(X, Y, Z).
        // scale: The size of the screen. Vector3.create(X, Y, Z).
        position: Vector3.create(3.9, 0, 0),      // Centered in a 16x16 parcel
        rotation: Quaternion.fromEulerDegrees(0, 0, 0),
        scale: Vector3.create(.75, 1, 1),

        // This crucial line links the screen to the M1D Relay.
        // It tells the screen to display whatever video the guide is playing.
        videoTexture: videoGuide.videoTexture
    });

    // =============================================================================
    // --- SCENE ASSET SETUP ---
    // Below is where the 3D models and other visual elements are loaded.
    // =============================================================================

    // --- Load the Dance Floor Model ---
    const danceFloor = engine.addEntity();
    // To use your own model, change the `src` path.
    GltfContainer.create(danceFloor, { src: 'models/DF_WithSpinning_Shuffle_Float2.glb' });
    Transform.create(danceFloor, { position: Vector3.create(0, 0.325, 0) });
    // This starts the animation loop built into the dance floor model.
    Animator.create(danceFloor, { states: [{ clip: 'Animation', playing: true, loop: true, speed: 0.5 }] });

    // --- Create the Color-Cycling Center of the Dance Floor ---
    // This is a simple box entity that fills the hole in the center of the dance floor model.
    const danceFloorFillerScreen = engine.addEntity();
    MeshRenderer.setBox(danceFloorFillerScreen);
    MeshCollider.setBox(danceFloorFillerScreen); // A collider allows players to walk on it.
    Transform.create(danceFloorFillerScreen, { 
        position: Vector3.create(5, 0.3, 8), 
        scale: Vector3.create(5.8, 0.05, 8.65) 
    });

    // --- Logic for the Color Cycling Effect ---

    // Define an array of colors to cycle through.
    // To customize, you can add, remove, or change any of these Color3 values.
    const fillerColors = [
        Color3.create(0.8, 0.4, 1.0),   // Soft purple
        Color3.create(0.4, 0.8, 1.0),   // Soft blue
        Color3.create(0.4, 1.0, 0.8),   // Soft teal
        Color3.create(1.0, 0.8, 0.4),   // Soft orange/yellow
        Color3.create(1.0, 0.4, 0.6),   // Soft pink
        Color3.create(0.6, 1.0, 0.4),   // Soft green
        Color3.create(1.0, 1.0, 0.7)    // Soft light yellow
    ];

    let colorIndex = 0;
    // This function applies the next color from the array to the filler box's material.
    const updateFillerColor = () => {
        const color = fillerColors[colorIndex];
        Material.setPbrMaterial(danceFloorFillerScreen, {
            roughness: 0.3,
            specularIntensity: 0.1,
            metallic: 0.2,
            emissiveIntensity: 0.7,
            emissiveColor: color, // The color makes the surface glow.
            albedoColor: { r: color.r, g: color.g, b: color.b, a: 1 } // The base color of the surface.
        });
        // This line makes sure the color index loops back to 0 when it reaches the end of the array.
        colorIndex = (colorIndex + 1) % fillerColors.length;
    };

    // This system runs on every frame to create the timed color change effect.
    engine.addSystem((function colorCycleSystem() {
        let elapsed = 0;
        return function (dt) { // dt is "delta time" - the time elapsed since the last frame.
            elapsed += dt;
            // To change the speed of the color cycle, change the number below (in seconds).
            if (elapsed >= 4) {
                updateFillerColor();
                elapsed = 0; // Reset the timer.
            }
        }
    }()));
    updateFillerColor(); // Call it once at the start to set the initial color.

    // --- Load the Ground Model ---
    const ground = engine.addEntity();
    // To use a different ground model, change the `src` path here.
    GltfContainer.create(ground, { src: 'models/ground1Parcel.glb' });
    Transform.create(ground, {
        position: Vector3.create(0, 0, 0), // Center the ground model in the parcel
        rotation: Quaternion.fromEulerDegrees(0, 0, 0),
        scale: Vector3.create(1, 1, 1)
    });
}