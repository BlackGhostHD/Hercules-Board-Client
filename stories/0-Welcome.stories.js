import { linkTo } from "@storybook/addon-links";
import BaseCard from "@/components/BaseCard";

export default {
  title: "Welcome",
  component: BaseCard
};

export const ToStorybook = () => ({
  components: { BaseCard },
  template: `<BaseCard type="info">info</BaseCard>`,
  methods: { action: linkTo("Button") }
});

ToStorybook.story = {
  name: "to Storybook"
};
