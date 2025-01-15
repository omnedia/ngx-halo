# ngx-halo

<a href="https://ngxui.com" target="_blank" style="display: flex;gap: .5rem;align-items: center;cursor: pointer; padding: 0 0 0 0; height: fit-content;">
  <img src="https://ngxui.com/assets/img/ngxui-logo.png" style="width: 64px;height: 64px;">
</a>

This Library is part of the NGXUI ecosystem. <br>
View all available components at https://ngxui.com

`@omnedia/ngx-halo` is an Angular library that creates a beautiful, animated halo effect. This component provides a circular, gradient-based effect with smooth animations and interactive mouse tracking. It's perfect for enhancing the visual experience of your Angular applications.

## Features

- Animated halo circle with a customizable gradient effect.
- Interactive mouse movement support for dynamic effects.
- Control animation, halo size, colors, and shadows through simple inputs.
- Supports flexible positioning and CSS customization.

## Installation

Install the library using npm:

```bash
npm install @omnedia/ngx-halo
```

## Usage

Import the `NgxHaloComponent` in your Angular module or component:

```typescript
import { NgxHaloComponent } from '@omnedia/ngx-halo';

@Component({
  ...
  imports: [NgxHaloComponent],
  ...
})
```

Use the component in your template:

```html
<om-halo [animate]="true" [interactive]="true" [position]="'center'" [haloSize]="'300px'" [haloColors]="'#ff0000, #00ff00, #0000ff'" [haloShadow]="'0 0 80px rgba(0,0,0,0.5)'">
  <h1>Your Content Here</h1>
</om-halo>
```

## How It Works

- **Interactive Mouse Movement:** The halo responds to mouse movements with smooth, delayed transitions.
- **Animation Control:** Control whether the halo animates on its own or stops while interacting using the `animate` input.
- **Customizable Appearance:** The halo's size, colors, and shadow can be controlled via dedicated inputs (`haloSize`, `haloColors`, and `haloShadow`).
- **Positioning:** Set the initial position of the halo with the `position` input.
- **Styling:** The component allows custom CSS styling via the `styleClass` input.

## API

```html
<om-halo
  [animate]="animate"
  [interactive]="interactive"
  [position]="position"
  [haloSize]="haloSize"
  [haloColors]="haloColors"
  [haloShadow]="haloShadow"
  styleClass="custom-halo-class"
>
  <ng-content></ng-content>
</om-halo>
```

### Inputs:
- `animate` (optional): A boolean to control if the halo is animated by default. Defaults to `true`.
- `interactive` (optional): A boolean to enable or disable mouse interaction. Defaults to `true`.
- `position` (optional): Sets the halo's initial position. Accepts values like `'center'`, `'top-left'`, `'bottom-right'`, etc.
- `haloSize` (optional): A string defining the halo's size (e.g., `'300px'`).
- `haloColors` (optional): A string representing the gradient colors for the halo effect. Default `'#5fffda 20%, #46a8ff 50%, #cc32f6 100%'`.
- `haloShadow` (optional): A string defining the halo's box shadow. Default `'-60px -60px 100px rgba(234, 255, 95, 0.8), 0 0 80px rgba(244, 173, 108, 0.5), 60px 60px 120px rgba(225, 71, 181, 0.6)'`.
- `styleClass` (optional): A custom CSS class for additional styling.

## Example

```html
<om-halo [animate]="true" [interactive]="true" position="top-right" haloSize="400px" haloColors="'#f00, #0f0, #00f'" haloShadow="'0 0 100px rgba(0,0,0,0.8)'" styleClass="custom-halo-style">
  <div class="inner-content">
    <h2>Welcome to the Halo Effect</h2>
  </div>
</om-halo>
```

## Styling
`.om-halo`

The `.om-halo` container allows you to apply global or custom styles using the `styleClass` input. The component manages the gradient and animation, while you can extend the styling for the container itself.

### Example of Global and Custom Styling

```html
<om-halo styleClass="custom-halo-background">
    <div class="inner-content">
        <h2>Custom Halo Styling Example</h2>
    </div>
</om-halo>
```

```css
.custom-halo-background {
  background-color: #1e1e1e;
  padding: 2rem;
  border-radius: 10px;
}

.inner-content {
  text-align: center;
  color: white;
}
```

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss new features or bug fixes.

## License

This project is licensed under the MIT License.
