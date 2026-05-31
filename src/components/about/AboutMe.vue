<script>
export default {
	setup() {
		return {
			bios: [
				{
					id: 1,
					bio: '我是周海卫，2001年6月4日生，一个喜欢安静写代码的全栈开发者。INFP 型人格让我对细节有天然的敏感，也让我始终追求做出有温度的产品。',
				},
				{
					id: 2,
					bio: 'I enjoy working across the entire stack — from backend APIs and database design to frontend UI and developer experience. Clean architecture and thoughtful user experiences are what I care about most.',
				},
				{
					id: 3,
					bio: 'This site is my personal corner of the web — a place to share projects, notes, and things I learn along the way.',
				},
			],
		};
	},
};
</script>

<template>
	<div class="block sm:flex sm:gap-10 mt-10 sm:mt-20">
		<div class="w-full sm:w-1/4 mb-7 sm:mb-0">
			<img
				src="@/assets/images/profile.jpeg"
				class="rounded-xl w-96"
				alt=""
			/>
		</div>

		<div class="w-full sm:w-3/4 text-left">
			<p
				v-for="bio in bios"
				:key="bio.id"
				class="font-general-regular mb-4 text-ternary-dark dark:text-ternary-light text-lg"
			>
				{{ bio.bio }}
			</p>
		</div>
	</div>
</template>
