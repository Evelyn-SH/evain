<script>
import AboutMe from '@/components/about/AboutMe.vue';
import AboutCounter from '@/components/about/AboutCounter.vue';

export default {
	name: 'About',
	components: {
		AboutMe,
		AboutCounter,
	},
};
</script>

<template>
	<div class="container mx-auto mt-10 sm:mt-20">
		<AboutMe />
		<AboutCounter />
	</div>
</template>
