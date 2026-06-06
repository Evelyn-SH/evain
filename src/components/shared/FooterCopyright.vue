<script>
export default {
	data: () => {
		return {
			copyrightDate: new Date().getFullYear(),
			siteName: '千玺共鸣站',
		};
	},
};
</script>

<template>
	<div class="flex flex-col justify-center items-center text-center">
		<div
			class="font-general-regular text-lg text-white/70"
		>
			&copy; {{ copyrightDate }}.
			<span
				class="font-general-medium text-white uppercase"
			>
				{{ siteName }}
			</span>
		</div>
		<p class="font-general-regular mt-3 max-w-2xl text-sm leading-6 text-white/45">
			非官方粉丝共建站。本站仅收录公开资料与粉丝原创表达，侵权内容请联系删除。
		</p>
	</div>
</template>
