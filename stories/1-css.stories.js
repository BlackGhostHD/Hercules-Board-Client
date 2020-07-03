import { storiesOf } from "@storybook/vue";
import Color from "./components/Color";

storiesOf("1 Base CSS", module).add("Color", () => ({
  components: { Color },
  template: `
  <div style="padding: 0 20px;">
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
