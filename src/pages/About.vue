<template>
  <div class="about">
    <a class="waves-effect waves-light btn">button</a>
    {{ $t("routes.name.dashboard") }}

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
</template>

<script>
import BaseCard from "@/components/BaseCard";
export default {
  name: "About",
  components: { BaseCard }
};
</script>
