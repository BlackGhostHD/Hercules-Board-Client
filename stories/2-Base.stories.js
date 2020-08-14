import { storiesOf } from "@storybook/vue";
import { color, boolean, text, select } from "@storybook/addon-knobs";

import BaseCard from "@/components/BaseCard";
import BaseProgressbar from "@/components/BaseProgressbar";
import BaseTooltip from "@/components/BaseTooltip";
import ProgressCubes from "@/components/ProgressCubes";
import BaseButton from "@/components/BaseButton";

storiesOf("2 Base UI Components", module)
	.add("BaseCard", () => ({
		components: { BaseCard },
		props: {
			color: {
				default: color("Color", "#ffffff"),
			},
			isFilled: {
				default: boolean("Filled", true),
			},
			text: {
				default: text("Content", "Some Text"),
			},
		},
		template: `
  <div>
    <b>Knobs:</b> <br/>
    <BaseCard :color=color :filled=isFilled>{{text}}</BaseCard>

    <br><br>

    <div class="row">
      <div class="col s12">Cards</div>
      <div class="col s12 m6 l4">
        <BaseCard>default</BaseCard>
      </div>
      <div class="col s12 m6 l4">
        <BaseCard type="info">info</BaseCard>
      </div>
      <div class="col s12 m6 l4">
        <BaseCard type="success">success</BaseCard>
      </div>
      <div class="col s12 m6 l4">
        <BaseCard type="warning">warning</BaseCard>
      </div>
      <div class="col s12 m6 l4">
        <BaseCard type="danger">danger</BaseCard>
      </div>
      <div class="col s12 m6 l4">
        <BaseCard color="#f4e1ad">custom</BaseCard>
      </div>

      <br><br>

      <div class="col s12">Cards filled</div>
      <div class="col s12 m6 l4">
        <BaseCard>default</BaseCard>
      </div>
      <div class="col s12 m6 l4">
        <BaseCard type="info" :filled="true">info</BaseCard>
      </div>
      <div class="col s12 m6 l4">
        <BaseCard type="success" :filled="true">success</BaseCard>
      </div>
      <div class="col s12 m6 l4">
        <BaseCard type="warning" :filled="true">warning</BaseCard>
      </div>
      <div class="col s12 m6 l4">
        <BaseCard type="danger" :filled="true">danger</BaseCard>
      </div>
      <div class="col s12 m6 l4">
        <BaseCard color="#f4e1ad" :filled="true">custom</BaseCard>
      </div>
    </div>
    </div>
  `,
	}))
	.add("BaseProgressbar", () => ({
		components: { BaseProgressbar },
		data() {
			return {
				data1: [
					{
						hint: "Free Space",
						color: "var(--color-success)",
						value: "6",
					},
					{
						hint: "Warning",
						color: "var(--color-warning)",
						value: "4",
					},
					{
						hint: "Danger",
						color: "var(--color-danger)",
						value: "2",
					},
				],
				data2: [
					{
						hint: "Free Space",
						color: "var(--color-success)",
						value: "8",
					},
					{
						hint: "Warning",
						color: "var(--color-warning)",
						value: "1",
					},
				],
				max: 12,
			};
		},
		template: `
      <div>
        <BaseProgressbar :max=max :data=data1 style="margin: 5px;"/>
        <BaseProgressbar :max=max :data=data1 size="slim" style="margin: 5px;"/>
        <BaseProgressbar :max=max :data=data1 size="x-slim" style="margin: 5px;"/>
        <BaseProgressbar :max=max :data=data2 style="margin: 5px;"/>
        <BaseProgressbar :max=max :data=data2 size="slim" style="margin: 5px;"/>
        <BaseProgressbar :max=max :data=data2 size="x-slim" style="margin: 5px;"/>
      </div>
  `,
	}))
	.add("ProgressCubes", () => ({
		components: { ProgressCubes },
		data() {
			return {
				data: [
					{
						hint: "Check1",
						color: "var(--color-success)",
					},
					{
						hint: "Check2",
						color: "var(--color-success)",
					},
					{
						hint: "Check3",
						color: "var(--color-success)",
					},
					{
						hint: "Check4",
						color: "var(--color-success)",
					},
					{
						hint: "Check5",
						color: "var(--color-success)",
					},
					{
						hint: "Check6",
						color: "var(--color-success)",
					},
					{
						hint: "Check7",
						color: "var(--color-success)",
					},
					{
						hint: "Check8",
						color: "var(--color-success)",
					},
					{
						hint: "Check9",
						color: "var(--color-success)",
					},
					{
						hint: "Check10",
						color: "var(--color-success)",
					},
					{
						hint: "Check11",
						color: "var(--color-success)",
					},
					{
						hint: "Check12",
						color: "var(--color-success)",
					},
					{
						hint: "Check13",
						color: "var(--color-success)",
					},
					{
						hint: "Check14",
						color: "var(--color-success)",
					},
					{
						hint: "Check15",
						color: "var(--color-warning)",
					},
					{
						hint: "Check16",
						color: "var(--color-warning)",
					},
					{
						hint: "Check17",
						color: "var(--color-warning)",
					},
					{
						hint: "Check18",
						color: "var(--color-danger)",
					},
				],
				max: 15,
			};
		},
		template: `
      <div style="margin-left: 50vw; margin-top: 30vh;">
        <ProgressCubes :max=max :data=data style="margin: 5px;"/>
      </div>
  `,
	}))
	.add("BaseTooltip", () => ({
		components: { BaseTooltip },
		props: {
			position: {
				default: select("Position", ["top", "bottom", "left", "right"], "top"),
			},
			alignment: {
				default: select("Alignment", ["start", "middle", "end"], "middle"),
			},
			text: {
				default: text("Text", "Some Text"),
			},
		},
		template: `
      <div style="text-align: center; margin-top: 30vh;" >
        <BaseTooltip :position=position :alignment=alignment :text=text>Hover over me</BaseTooltip>
      </div>
  `,
	}))
	.add("BaseButton", () => ({
		components: { BaseButton },
		props: {
			position: {
				default: select("Position", ["top", "bottom", "left", "right"], "top"),
			},
			text: {
				default: text("Text", "Some Text"),
			},
		},
		template: `
      <div style="text-align: center; margin-top: 30vh;" >
        <BaseButton>DETAILS</BaseButton>
      </div>
  `,
	}));
