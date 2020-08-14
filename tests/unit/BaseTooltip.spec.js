import BaseTooltip from "@/components/BaseTooltip";
import { mount } from "@vue/test-utils";

describe("@components/BaseTooltip", () => {
	it("show tooltip on hover", async () => {
		const text = "some tooltip text";

		const wrapper = mount(BaseTooltip, {
			propsData: {
				text,
			},
		});

		expect(wrapper.find(".tooltip-text").exists()).toBe(true);
		expect(wrapper.find(".tooltip-text").text()).toBe(text);
	});
});
