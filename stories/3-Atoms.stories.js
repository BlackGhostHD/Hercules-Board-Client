import { storiesOf } from "@storybook/vue";
import { select, text, color, object } from "@storybook/addon-knobs";

import ProfilePicture from "@/components/ProfilePicture";
import exampleProfilePic from "@/assets/exampleProfilePic.png";
import Label from "@/components/Label";
import PRCard from "@/components/PRCard";
import PullCard from "@/components/PullCard";
import prMockData from "./mockData/pr";

storiesOf("3 Atoms Components", module)
	.add("ProfilePicture", () => ({
		components: { ProfilePicture },
		props: {
			size: {
				default: select(
					"Size",
					["", "x-small", "small", "medium", "large"],
					"small"
				),
			},
		},
		data() {
			return {
				src: exampleProfilePic,
			};
		},
		template: `
    <div style="margin: 20px;">
        <ProfilePicture :src=src :size=size />
    </div>
  `,
	}))
	.add("Label", () => ({
		components: { Label },
		props: {
			color: {
				default: color("Color", "#9800FF"),
			},
			name: {
				default: text("Name", "This is the Name of the Label"),
			},
			size: {
				default: select("Size", ["small", "medium", "large"], "small"),
			},
			type: {
				default: select("Type", ["no-limit", "limit"], "limit"),
			},
		},
		data() {
			return {
				src: exampleProfilePic,
			};
		},
		template: `
    <div style="margin: 20px;">
        <Label :name=name :color=color :type=type :size=size />
    </div>
  `,
	}))
	.add("PRCard", () => ({
		components: { PRCard },
		// data() {
		//   return { data: prMockData };
		// },
		props: {
			data: {
				default: object("Data", prMockData),
			},
		},
		data() {
			return {
				data1: [
					{
						color: "var(--color-success)",
						value: "6",
					},
					{
						color: "var(--color-warning)",
						value: "4",
					},
					{
						color: "var(--color-danger)",
						value: "2",
					},
				],
				max: 12,
			};
		},
		template: `
      <div>
          <PRCard :data=data :x=data1 :y=max />
      </div>
    `,
	}))
	.add("PullCard", () => ({
		components: { PullCard },
		props: {
			data: {
				default: object("Data", prMockData),
			},
		},
		data() {
			return {
				data1: [
					{
						color: "var(--color-success)",
						value: "6",
					},
					{
						color: "var(--color-warning)",
						value: "4",
					},
					{
						color: "var(--color-danger)",
						value: "2",
					},
				],
				max: 12,
			};
		},
		template: `
      <div>
          <PullCard :data=data :x=data1 :y=max />
      </div>
    `,
	}));
