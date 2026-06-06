<script>
const timeline = [
	{
		date: '2000.11',
		year: '2000',
		title: '出生于湖南怀化',
		text: '易烊千玺，Jackson Yee，2000 年 11 月 28 日出生。',
		tag: '起点'
	},
	{
		date: '2013.08',
		year: '2013',
		title: '以 TFBOYS 成员身份出道',
		text: '从少年舞台进入公众视野，音乐、舞蹈与综艺积累了最早的一批关注。',
		tag: '出道'
	},
	{
		date: '2017',
		year: '2017',
		title: '个人音乐表达持续展开',
		text: '单曲、舞台和个人影像让粉丝开始看到更完整的个人气质。',
		tag: '音乐'
	},
	{
		date: '2018',
		year: '2018',
		title: '进入中央戏剧学院学习',
		text: '系统学习表演，为后续的大银幕角色积累专业训练。',
		tag: '学习'
	},
	{
		date: '2019.06',
		year: '2019',
		title: '《长安十二时辰》播出',
		text: '饰演李必，角色的沉稳、克制与少年感让演员身份被更多观众注意。',
		tag: '剧集'
	},
	{
		date: '2019.10',
		year: '2019',
		title: '《少年的你》上映',
		text: '饰演小北，这是他电影演员路径上非常关键的一次转折。',
		tag: '电影'
	},
	{
		date: '2020.05',
		year: '2020',
		title: '获得香港电影金像奖最佳新演员',
		text: '凭《少年的你》获得认可，也让“演员易烊千玺”的路径更清晰。',
		tag: '奖项'
	},
	{
		date: '2020.12',
		year: '2020',
		title: '《送你一朵小红花》上映',
		text: '饰演韦一航，把青春、病痛与亲情里的柔软情绪带到观众面前。',
		tag: '电影'
	},
	{
		date: '2021.09',
		year: '2021',
		title: '《长津湖》上映',
		text: '饰演伍万里，在战争群像中完成从少年到战士的角色成长。',
		tag: '电影'
	},
	{
		date: '2022.02',
		year: '2022',
		title: '《奇迹·笨小孩》上映',
		text: '饰演景浩，把普通人的倔强、压力和希望落在现实质感里。',
		tag: '电影'
	},
	{
		date: '2022.02',
		year: '2022',
		title: '《长津湖之水门桥》上映',
		text: '伍万里的故事继续推进，角色在极端环境中完成更沉重的成长。',
		tag: '电影'
	},
	{
		date: '2023.01',
		year: '2023',
		title: '《满江红》上映',
		text: '饰演孙均，角色在悬疑、权谋和情绪转折中呈现新的锋利感。',
		tag: '电影'
	},
	{
		date: '2024.12',
		year: '2024',
		title: '《小小的我》上映',
		text: '饰演刘春和，用更细腻的身体与情绪表达打开新的角色维度。',
		tag: '电影'
	},
	{
		date: '2025.05',
		year: '2025',
		title: '《狂野时代》亮相戛纳',
		text: '主演毕赣作品进入国际电影节视野，作品版图继续向外延展。',
		tag: '国际'
	},
	{
		date: '2025.11',
		year: '2025',
		title: '凭《小小的我》获得金鸡奖认可',
		text: '角色刘春和成为他演员阶段又一个高光节点，也值得粉丝长期整理资料。',
		tag: '奖项'
	}
];

const works = [
	{
		name: '少年的你',
		role: '小北',
		year: '2019',
		tag: '银幕转折',
		poster: 'https://image11.m1905.cn/mdb/uploadfile/2019/1022/thumb_1_327_450_20191022031055253435.jpg',
		source: 'https://www.1905.com/mdb/film/2245990/'
	},
	{
		name: '送你一朵小红花',
		role: '韦一航',
		year: '2020',
		tag: '温柔与疼痛',
		poster: 'https://image11.m1905.cn/mdb/uploadfile/2020/0824/thumb_1_327_450_20200824051101654653.jpg',
		source: 'https://www.1905.com/mdb/film/2253125/'
	},
	{
		name: '长津湖',
		role: '伍万里',
		year: '2021',
		tag: '战争群像',
		poster: 'https://image11.m1905.cn/mdb/uploadfile/2022/1024/thumb_1_327_450_20221024101222153024.jpg',
		source: 'https://www.1905.com/mdb/film/2251111/'
	},
	{
		name: '奇迹·笨小孩',
		role: '景浩',
		year: '2022',
		tag: '现实奋斗',
		poster: 'https://image11.m1905.cn/mdb/uploadfile/2022/0112/thumb_1_327_450_20220112111723102956.jpg',
		source: 'https://www.1905.com/mdb/film/2254394/'
	},
	{
		name: '满江红',
		role: '孙均',
		year: '2023',
		tag: '古装悬疑',
		poster: 'https://image11.m1905.cn/mdb/uploadfile/2023/0116/thumb_1_327_450_20230116093143150463.jpg',
		source: 'https://www.1905.com/mdb/film/2255859/'
	},
	{
		name: '小小的我',
		role: '刘春和',
		year: '2024',
		tag: '角色突破',
		poster: 'https://image11.m1905.cn/mdb/uploadfile/2024/1223/thumb_1_327_450_20241223103533921329.jpg',
		source: 'https://www.1905.com/mdb/film/2257202/'
	}
];

const moments = [
	{
		title: '笑起来的瞬间',
		type: '公开影像',
		desc: '比起履历上的节点，这些轻松的表情让资料库更像有人呼吸。',
		image: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Jackson_Yee_%E7%AC%91%E5%AE%B9.jpg',
		source: 'https://commons.wikimedia.org/wiki/File:Jackson_Yee_%E7%AC%91%E5%AE%B9.jpg',
		credit: 'Wikimedia Commons / CC BY-SA 4.0'
	},
	{
		title: '舞台上的光',
		type: '演唱会',
		desc: '舞蹈、音乐和现场反馈，是演员之外很重要的另一条线。',
		image: 'https://upload.wikimedia.org/wikipedia/commons/4/43/2019_Jackson_Yee_Concert.jpg',
		source: 'https://commons.wikimedia.org/wiki/File:2019_Jackson_Yee_Concert.jpg',
		credit: 'Wikimedia Commons / CC BY-SA 4.0'
	},
	{
		title: '活动现场',
		type: '公开活动',
		desc: '公开活动中的状态，可以和作品时间线一起组成更完整的成长记录。',
		image: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/2024_Jackson_Yee.jpg',
		source: 'https://commons.wikimedia.org/wiki/File:2024_Jackson_Yee.jpg',
		credit: 'Wikimedia Commons / CC BY-SA 4.0'
	},
	{
		title: '现场回声',
		type: '舞台记录',
		desc: '粉丝记住的不只是作品，也有每一次舞台灯光落下来的瞬间。',
		image: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Jackson_Yee_at_Que_Xue_Concert_in_2025.jpg',
		source: 'https://commons.wikimedia.org/wiki/File:Jackson_Yee_at_Que_Xue_Concert_in_2025.jpg',
		credit: 'Wikimedia Commons / CC BY-SA 4.0'
	}
];

const timelineGroups = timeline.reduce((groups, item) => {
	const group = groups.find((entry) => entry.year === item.year);

	if (group) {
		group.items.push(item);
	} else {
		groups.push({
			year: item.year,
			items: [item]
		});
	}

	return groups;
}, []);

export default {
	name: 'Home',
	data() {
		return {
			timeline,
			timelineGroups,
			moments,
			works
		};
	}
};
</script>

<template>
	<main class="mx-auto w-full px-4 sm:px-6 lg:px-8">
		<section id="timeline" class="pt-4 pb-8 text-left sm:pt-6">
			<div class="-mx-4 sm:-mx-6 lg:-mx-8">
					<div class="min-h-[calc(100vh-6rem)] overflow-hidden bg-[#141414] text-white shadow-sm">
						<div class="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
							<div>
								<p class="font-general-medium text-sm uppercase tracking-[0.25em] text-white/50">
									重要节点
								</p>
								<h1 class="font-general-bold mt-2 text-3xl sm:text-5xl">
									易烊千玺时间线
								</h1>
							</div>
							<div class="hidden grid-cols-3 gap-2 sm:grid">
								<div class="rounded-2xl bg-white/10 px-4 py-3 text-center">
									<p class="font-general-bold text-2xl">{{ timeline.length }}</p>
									<p class="font-general-regular text-xs text-white/50">节点</p>
								</div>
								<div class="rounded-2xl bg-white/10 px-4 py-3 text-center">
									<p class="font-general-bold text-2xl">{{ timelineGroups.length }}</p>
									<p class="font-general-regular text-xs text-white/50">年份</p>
								</div>
								<div class="rounded-2xl bg-white/10 px-4 py-3 text-center">
									<p class="font-general-bold text-2xl">{{ works.length }}</p>
									<p class="font-general-regular text-xs text-white/50">作品</p>
								</div>
							</div>
						</div>

						<div class="relative overflow-x-auto px-5 py-6">
							<div class="absolute left-5 right-5 top-[5.35rem] h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
							<div class="flex min-w-max gap-4 pb-2">
								<section
									v-for="group in timelineGroups"
									:key="group.year"
									class="relative w-80 shrink-0"
								>
									<div class="mb-5 flex items-center gap-3">
										<span class="h-3 w-3 rounded-full bg-[#ff7963] shadow-[0_0_0_6px_rgba(255,121,99,.14)]"></span>
										<p class="font-general-bold text-4xl leading-none">
											{{ group.year }}
										</p>
									</div>

									<div class="space-y-3">
										<article
											v-for="item in group.items"
											:key="item.date + item.title"
											class="group min-h-[10.5rem] rounded-2xl bg-white p-4 text-[#222] shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
										>
											<div class="mb-4 h-20 rounded-xl bg-gradient-to-br from-[#f1f2f7] via-white to-[#ffe3dd] p-3">
												<div class="flex items-center justify-between">
													<span class="font-general-semibold rounded-full bg-[#141414] px-3 py-1 text-xs text-white">
														{{ item.date }}
													</span>
													<span class="font-general-medium rounded-full bg-white/80 px-3 py-1 text-xs text-[#ff7963]">
														{{ item.tag }}
													</span>
												</div>
											</div>
											<h4 class="font-general-semibold text-xl leading-snug">
												{{ item.title }}
											</h4>
											<p class="font-general-regular mt-2 line-clamp-3 text-sm leading-6 text-[#777]">
												{{ item.text }}
											</p>
										</article>
									</div>
								</section>
							</div>
						</div>
					</div>

			</div>
		</section>

		<section class="py-12 text-left">
			<div class="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<p class="font-general-medium text-sm uppercase tracking-[0.25em] text-[#ff7963] dark:text-indigo-300">
						瞬间
					</p>
					<h2 class="font-general-semibold mt-3 text-3xl text-white">
						影像碎片
					</h2>
				</div>
			</div>

			<div class="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
				<article class="group relative min-h-[34rem] overflow-hidden rounded-[2rem] bg-primary-dark text-white shadow-xl">
					<img
						:src="moments[0].image"
						:alt="moments[0].title"
						loading="lazy"
						referrerpolicy="no-referrer"
						class="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
					/>
					<div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>
					<div class="absolute bottom-0 left-0 right-0 p-7">
						<span class="font-general-medium rounded-full bg-white px-3 py-1 text-xs text-primary-dark">
							{{ moments[0].type }}
						</span>
						<h3 class="font-general-bold mt-4 text-4xl">
							{{ moments[0].title }}
						</h3>
						<a
							:href="moments[0].source"
							target="_blank"
							rel="noreferrer"
							class="font-general-medium mt-5 inline-flex text-sm text-white/80 transition hover:text-white"
						>
							{{ moments[0].credit }} ↗
						</a>
					</div>
				</article>

				<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
					<article
						v-for="moment in moments.slice(1)"
						:key="moment.title"
						class="group grid overflow-hidden rounded-[1.75rem] bg-[#1d1d1d] shadow-sm ring-1 ring-white/10 transition hover:-translate-y-1 hover:shadow-xl sm:grid-cols-[10rem_1fr] lg:grid-cols-[11rem_1fr]"
					>
						<div class="relative min-h-[13rem] overflow-hidden bg-[#101010]">
							<img
								:src="moment.image"
								:alt="moment.title"
								loading="lazy"
								referrerpolicy="no-referrer"
								class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
							/>
						</div>
						<div class="p-5">
							<span class="font-general-medium rounded-full bg-white/10 px-3 py-1 text-xs text-[#ff7963]">
								{{ moment.type }}
							</span>
							<h3 class="font-general-semibold mt-4 text-2xl text-white">
								{{ moment.title }}
							</h3>
							<a
								:href="moment.source"
								target="_blank"
								rel="noreferrer"
								class="font-general-medium mt-4 inline-flex text-sm text-white/55 transition hover:text-white"
							>
								{{ moment.credit }} ↗
							</a>
						</div>
					</article>
				</div>
			</div>
		</section>

		<section class="py-12 text-left">
			<div class="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<p class="font-general-medium text-sm uppercase tracking-[0.25em] text-[#ff7963]">
						作品
					</p>
					<h2 class="font-general-semibold mt-3 text-3xl text-white">
						作品海报档案
					</h2>
				</div>
			</div>

			<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
				<article
					v-for="work in works"
					:key="work.name"
					class="group overflow-hidden rounded-[1.75rem] bg-[#1d1d1d] text-left shadow-sm ring-1 ring-white/10 transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
				>
					<div class="relative aspect-[327/450] overflow-hidden bg-[#101010]">
						<img
							:src="work.poster"
							:alt="`${work.name} 海报`"
							loading="lazy"
							referrerpolicy="no-referrer"
							class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
						/>
						<div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent p-5 text-white">
							<div class="flex items-center justify-between gap-3">
								<span class="font-general-semibold rounded-full bg-white px-3 py-1 text-xs text-primary-dark">
									{{ work.year }}
								</span>
								<span class="font-general-medium rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur">
									{{ work.tag }}
								</span>
							</div>
						</div>
					</div>

					<div class="p-5">
						<h3 class="font-general-semibold text-2xl text-white">
							{{ work.name }}
						</h3>
						<p class="font-general-regular mt-2 text-white/65">
							饰 {{ work.role }}
						</p>
						<a
							:href="work.source"
							target="_blank"
							rel="noreferrer"
							class="font-general-medium mt-5 inline-flex items-center text-sm text-white/55 transition hover:text-white"
						>
							来源：1905 电影网
							<span class="ml-1">↗</span>
						</a>
					</div>
				</article>
			</div>
		</section>
	</main>
</template>
