<script>
import ThemeSwitcher from '../ThemeSwitcher.vue';
import feather from 'feather-icons';

export default {
	components: {
		ThemeSwitcher,
	},
	data() {
		return {
			theme: '',
		};
	},

	created() {
		this.theme = localStorage.getItem('theme') || 'light';
	},
	mounted() {
		feather.replace();
		this.theme = localStorage.getItem('theme') || 'light';
	},
	methods: {
		updateTheme(theme) {
			this.theme = theme;
		},
	},
	updated() {
		feather.replace();
	},
};
</script>

<template>
	<nav id="nav" class="px-4 sm:px-6 lg:px-8">
		<div
			class="z-10 block sm:flex sm:justify-between sm:items-center my-4"
		>
			<div class="flex justify-between items-center">
				<div>
					<router-link
						to="/"
						class="font-general-bold text-2xl text-white"
						aria-label="千玺共鸣站"
					>
						千玺共鸣站
					</router-link>
				</div>

				<theme-switcher
					:theme="theme"
					@themeChanged="updateTheme"
					class="block sm:hidden bg-white/10 hover:bg-white/15 hover:shadow-sm px-2.5 py-2 rounded-lg"
				/>
			</div>

			<div
				class="hidden sm:flex justify-between items-center flex-col md:flex-row"
			>
				<theme-switcher
					:theme="theme"
					@themeChanged="updateTheme"
					class="ml-8 bg-white/10 px-3 py-2 shadow-sm rounded-xl cursor-pointer"
				/>
			</div>
		</div>
	</nav>
</template>

<style scoped>
#nav a.router-link-exact-active {
	@apply text-indigo-700;
	@apply dark:text-indigo-400;
	@apply font-medium;
}
</style>
