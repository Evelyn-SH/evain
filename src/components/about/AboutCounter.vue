<script>
export default {
	data: () => {
		return {
			title: '创造即是理解',
			description: '写代码、学东西、慢慢来。',
		};
	},
};
</script>

<template>
	<div class="mt-10 sm:mt-20 bg-primary-light dark:bg-ternary-dark shadow-sm">
		<div
			class="font-general-regular container mx-auto py-20 text-center"
		>
			<h3
				class="font-general-medium text-3xl font-bold text-secondary-dark dark:text-secondary-light mb-4"
			>
				{{ title }}
			</h3>
			<span class="text-lg text-ternary-dark dark:text-ternary-light">
				{{ description }}
			</span>
		</div>
	</div>
</template>
