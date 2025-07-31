<script lang="ts" setup>
</script>

<template>
  <div class="">
    <BlockHero />
    <BlockSplitImage
      title="Low Maintenance,<br>High Charm"
      image-url="
      cactus-2.png"
      :is-reverse="false"
      description="Spiky but full of charm, cacti bring bold character with minimal care. They thrive on sunlight and dry air, making them perfect for forgetful plant owners. Our collection includes a wide variety of shapes and sizes to match any style. Add texture and drama to your home with these striking, sculptural plants that are always on trend."
    >
      <NuxtLink class="btn group btn-primary  mt-4" to="/category/cactus">
        Explore Cactus
        <Icon
          name="tabler:cactus"
          class="group-hover:animate-bounce"
          size="20"
        />
      </NuxtLink>
    </BlockSplitImage>
    <BlockExploreCategory
      image="/desk.png"
      title="Green Up Your Workspace"
      description="Your desk deserves a touch of green. Our curated desk plant selection brings calm and focus to your workspace without taking up space. These plants are easy to care for and ideal for home offices or study nooks. Add a fresh accent to your routine and enjoy a little piece of nature while you work or create from your favorite spot."
    >
      <NuxtLink class="btn group btn-primary  mt-4" to="/category/desk-plants">
        See Desk Plants
        <Icon
          name="tabler:device-laptop"
          class="group-hover:animate-bounce"
          size="20"
        />
      </NuxtLink>
    </BlockExploreCategory>

    <BlockCarousel />

    <BlockSplitImage
      :is-reverse="true"
      title="Soft Shapes, Strong Style"
      image-url="/succulents.jpg"
      description="Succulents are soft, compact, and endlessly captivating. Their subtle hues and geometric forms make them ideal accents for shelves, windowsills, and gift boxes. Whether you prefer trailing varieties or tight rosettes, you'll find something to love. These resilient plants retain water and beauty effortlessly, brightening any corner without demanding much attention."
    >
      <NuxtLink class="btn btn-secondary mt-4" to="/category/cactus">
        Shop Succulents
        <Icon name="tabler:cactus" size="20" />
      </NuxtLink>
    </BlockSplitImage>
    <BlockExploreCategory
      image="/sun.png"
      title="Thriving in the Spotlight"
      description="Sun lovers flourish in warmth and brightness, adding vibrancy to every space they touch. If your home is full of light, these plants are your ideal match. From flowering species to dramatic foliage, our sun-friendly collection offers variety and charm. Give them the spotlight and watch them thrive all season long with minimal effort."
    >
      <NuxtLink class="btn group btn-primary flex w-fit  mt-4" to="/category/sun-lovers">
        Browse Sun Lovers
        <Icon
          name="tabler:sun"
          class="group-hover:animate-spin"
          size="20"
        />
      </NuxtLink>
    </BlockExploreCategory>
  </div>
</template>
Photo by Quang Nguyen Vinh: https://www.pexels.com/photo/assorted-color-flowers-2132227/
