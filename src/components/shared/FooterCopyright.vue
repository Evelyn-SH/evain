<script>
export default {
	data: () => {
		return {
			copyrightDate: new Date().getFullYear(),
			author: '周海卫',
		};
	},
};
</script>

<template>
	<div class="flex justify-center items-center text-center">
		<div
			class="font-general-regular text-lg text-ternary-dark dark:text-ternary-light"
		>
			&copy; {{ copyrightDate }}.
			<span
				class="font-general-medium text-secondary-dark dark:text-secondary-light uppercase"
			>
				{{ author }}
			</span>
		</div>
	</div>
</template>
