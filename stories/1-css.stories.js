import { storiesOf } from "@storybook/vue";
import Color from "./components/Color"
import { color, boolean, text } from "@storybook/addon-knobs";

storiesOf("1 Base CSS", module).add("Color", () => ({
  components: {Color},
  template: `
  <div>
  	<h3>Sidebar</h3>
	<div class="row">
		<Color variable="--color-sidebar" />
  		<Color variable="--color-sidebare-text" />
  		<Color variable="--color-sidebare-text-muted" />
	</div>
    <h3>Feedback / Status</h3>
    <div class="row">
        <Color variable="--color-success" />
        <Color variable="--color-info" />
        <Color variable="--color-warning" />
        <Color variable="--color-danger" />
	</div>
	<h3>Text</h3>
	<div class="row">
		<Color variable="--color-text" />
  		<Color variable="--color-text-white" />
		<Color variable="--color-text-black" />
		<Color variable="--color-text-muted" />
	</div>
  </div>
  `
}));

// --color-sidebar: rgb(255, 255, 255);
// --color-sidebare-text: rgb(60, 60, 60);
// --color-sidebare-text-muted: rgb(112, 112, 112);

// --color-text: rgb(112, 112, 112);
// --color-text-white: rgb(255, 255, 255);
// --color-text-black: rgb(0, 0, 0);
// --color-text-muted: rgb(128, 128, 128);

// --color-cards: rgb(255, 255, 255);

// --color-scrollbar-thumb: rgb(128, 128, 128);
