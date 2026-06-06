<script>
const timeline = [
	{
		id: 'birth-2000',
		date: '2000.11',
		year: '2000',
		title: '出生于湖南怀化',
		text: '易烊千玺，Jackson Yee，2000 年 11 月 28 日出生。',
		detail: '这个时间点是后面所有舞台、角色和作品的起点，也让很多粉丝习惯从“成长”而不是单一作品去理解他。',
		tag: '起点',
		focus: '从怀化出发，后来的每一次亮相都能回望到这里。',
		keywords: ['成长起点', '怀化', '2000']
	},
	{
		id: 'debut-2013',
		date: '2013.08',
		year: '2013',
		title: '以 TFBOYS 成员身份出道',
		text: '从少年舞台进入公众视野，音乐、舞蹈与综艺积累了最早的一批关注。',
		detail: '团体出道带来了高频曝光，也留下了大量早期舞台和采访素材，是粉丝整理资料时最密集的一段源头。',
		tag: '出道',
		focus: '少年舞台的入口，最早一批记忆从这里开始。',
		keywords: ['TFBOYS', '舞台', '早期关注']
	},
	{
		id: 'music-2017',
		date: '2017',
		year: '2017',
		title: '个人音乐表达持续展开',
		text: '单曲、舞台和个人影像让粉丝开始看到更完整的个人气质。',
		detail: '个人音乐与舞台表达逐渐成形，大家开始不只记住团体身份，也开始注意到他的个人审美和台风。',
		tag: '音乐',
		focus: '个人表达开始被真正看见。',
		keywords: ['个人单曲', '舞台', '气质']
	},
	{
		id: 'study-2018',
		date: '2018',
		year: '2018',
		title: '进入中央戏剧学院学习',
		text: '系统学习表演，为后续的大银幕角色积累专业训练。',
		detail: '表演训练让他的角色塑造更有方法感，这个阶段也常被视作演员路线的重要准备期。',
		tag: '学习',
		focus: '学习不是暂停曝光，而是在为后面的角色蓄力。',
		keywords: ['中戏', '表演训练', '沉淀']
	},
	{
		id: 'drama-2019',
		date: '2019.06',
		year: '2019',
		title: '《长安十二时辰》播出',
		text: '饰演李必，角色的沉稳、克制与少年感让演员身份被更多观众注意。',
		detail: '李必这个角色让很多原本只熟悉偶像身份的观众，第一次认真注意到他处理角色时的分寸感。',
		tag: '剧集',
		focus: '剧集里的克制与少年感一起成立。',
		keywords: ['李必', '剧集代表', '演员被看见']
	},
	{
		id: 'better-days-2019',
		date: '2019.10',
		year: '2019',
		title: '《少年的你》上映',
		text: '饰演小北，这是他电影演员路径上非常关键的一次转折。',
		detail: '《少年的你》之后，他的银幕存在感被迅速确认，小北也成了很多人提起演员易烊千玺时最先想到的角色。',
		tag: '电影',
		focus: '电影演员路线真正被打开的一次转折。',
		keywords: ['小北', '银幕转折', '代表作']
	},
	{
		id: 'award-2020',
		date: '2020.05',
		year: '2020',
		title: '获得香港电影金像奖最佳新演员',
		text: '凭《少年的你》获得认可，也让“演员易烊千玺”的路径更清晰。',
		detail: '金像奖最佳新演员的认可，让前一年的突破不再只是讨论热度，而是变成了行业维度的正式确认。',
		tag: '奖项',
		focus: '从被讨论，到被奖项盖章。',
		keywords: ['金像奖', '最佳新演员', '行业认可']
	},
	{
		id: 'little-red-flower-2020',
		date: '2020.12',
		year: '2020',
		title: '《送你一朵小红花》上映',
		text: '饰演韦一航，把青春、病痛与亲情里的柔软情绪带到观众面前。',
		detail: '韦一航这个角色把脆弱、倔强和家庭关系里的细节推到前面，也让观众看到他更柔软的一面。',
		tag: '电影',
		focus: '情绪密度很高的一次表演。',
		keywords: ['韦一航', '情绪表达', '青春电影']
	},
	{
		id: 'battle-lake-2021',
		date: '2021.09',
		year: '2021',
		title: '《长津湖》上映',
		text: '饰演伍万里，在战争群像中完成从少年到战士的角色成长。',
		detail: '伍万里的成长线非常明确，从莽撞少年到真正理解战争的代价，这条线也让角色记忆点非常强。',
		tag: '电影',
		focus: '少年感与战争题材在同一个角色里并存。',
		keywords: ['伍万里', '战争群像', '成长线']
	},
	{
		id: 'miracle-2022',
		date: '2022.02',
		year: '2022',
		title: '《奇迹·笨小孩》上映',
		text: '饰演景浩，把普通人的倔强、压力和希望落在现实质感里。',
		detail: '景浩并不是外放型人物，很多压力和坚持都压在表情和动作里，这也让角色更贴近现实生活。',
		tag: '电影',
		focus: '现实主义质感很强的一次出演。',
		keywords: ['景浩', '现实题材', '普通人力量']
	},
	{
		id: 'watergate-2022',
		date: '2022.02',
		year: '2022',
		title: '《长津湖之水门桥》上映',
		text: '伍万里的故事继续推进，角色在极端环境中完成更沉重的成长。',
		detail: '同一角色在更残酷的战场环境里被继续推进，情绪重量比前作更重，也更考验持续塑造能力。',
		tag: '电影',
		focus: '同一个人物，在更极端环境里的继续成长。',
		keywords: ['水门桥', '续作', '情绪重量']
	},
	{
		id: 'full-river-red-2023',
		date: '2023.01',
		year: '2023',
		title: '《满江红》上映',
		text: '饰演孙均，角色在悬疑、权谋和情绪转折中呈现新的锋利感。',
		detail: '孙均的锋利、压迫感和情绪拐点都更明显，这个角色也让他的表演层次显得更有侵略性。',
		tag: '电影',
		focus: '角色气质一下子更硬、更利。',
		keywords: ['孙均', '反差感', '悬疑张力']
	},
	{
		id: 'big-world-2024',
		date: '2024.12',
		year: '2024',
		title: '《小小的我》上映',
		text: '饰演刘春和，用更细腻的身体与情绪表达打开新的角色维度。',
		detail: '刘春和被不少观众视为近年最有突破感的角色之一，身体状态和情绪表达都更细密。',
		tag: '电影',
		focus: '细节密度很高的一次角色突破。',
		keywords: ['刘春和', '角色突破', '细腻表达']
	},
	{
		id: 'cannes-2025',
		date: '2025.05',
		year: '2025',
		title: '《狂野时代》亮相戛纳',
		text: '主演毕赣作品进入国际电影节视野，作品版图继续向外延展。',
		detail: '进入戛纳语境，意味着作品讨论范围被进一步打开，也让后续资料整理多了一条国际影展线索。',
		tag: '国际',
		focus: '作品开始进入更外部的电影语境。',
		keywords: ['戛纳', '国际影展', '新阶段']
	},
	{
		id: 'golden-rooster-2025',
		date: '2025.11',
		year: '2025',
		title: '凭《小小的我》获得金鸡奖认可',
		text: '角色刘春和成为他演员阶段又一个高光节点，也值得粉丝长期整理资料。',
		detail: '如果说前面的节点是不断累积，这一刻更像阶段性回望，把近几年的角色选择集中照亮了一次。',
		tag: '奖项',
		focus: '把前面积累过的表演路线再确认一遍。',
		keywords: ['金鸡奖', '阶段高光', '演员认可']
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
			activeTimelineId: timeline[0].id,
			timeline,
			timelineGroups,
			moments,
			works
		};
	},
	computed: {
		activeTimelineIndex() {
			const currentIndex = this.timeline.findIndex(
				(item) => item.id === this.activeTimelineId
			);

			return currentIndex === -1 ? 0 : currentIndex;
		},
		activeTimelineItem() {
			return this.timeline[this.activeTimelineIndex];
		},
		activeTimelineYearItems() {
			const currentGroup = this.timelineGroups.find(
				(group) => group.year === this.activeTimelineItem.year
			);

			return currentGroup ? currentGroup.items : [];
		}
	},
	methods: {
		isActiveTimeline(id) {
			return this.activeTimelineId === id;
		},
		isActiveTimelineYear(year) {
			return this.activeTimelineItem.year === year;
		},
		selectTimelineItem(id) {
			this.activeTimelineId = id;
		},
		selectTimelineYear(year) {
			const currentGroup = this.timelineGroups.find((group) => group.year === year);

			if (currentGroup && currentGroup.items.length > 0) {
				this.activeTimelineId = currentGroup.items[0].id;
			}
		},
		showPreviousTimeline() {
			const nextIndex =
				this.activeTimelineIndex === 0
					? this.timeline.length - 1
					: this.activeTimelineIndex - 1;

			this.activeTimelineId = this.timeline[nextIndex].id;
		},
		showNextTimeline() {
			const nextIndex =
				this.activeTimelineIndex === this.timeline.length - 1
					? 0
					: this.activeTimelineIndex + 1;

			this.activeTimelineId = this.timeline[nextIndex].id;
		}
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
							<div class="absolute left-5 right-5 top-[3.25rem] h-px bg-gradient-to-r from-transparent via-white/40 to-transparent sm:top-[4.3rem]"></div>
							<div class="flex min-w-max gap-10 pb-1 sm:gap-14">
								<button
									v-for="group in timelineGroups"
									:key="group.year"
									type="button"
									@click="selectTimelineYear(group.year)"
									:aria-pressed="isActiveTimelineYear(group.year)"
									:class="[
										isActiveTimelineYear(group.year)
											? 'text-white'
											: 'text-white/65 hover:text-white/90',
										'relative shrink-0 text-left transition'
									]"
								>
									<div class="mb-2 flex items-center gap-3">
										<span
											:class="[
												isActiveTimelineYear(group.year)
													? 'bg-[#ff7963] shadow-[0_0_0_6px_rgba(255,121,99,.14)]'
													: 'bg-white/30',
												'h-3 w-3 rounded-full transition'
											]"
										></span>
										<p class="font-general-bold text-4xl leading-none">
											{{ group.year }}
										</p>
									</div>
									<div class="pl-6">
										<p class="font-general-medium text-sm text-white/35">
											{{ group.items.length }} 个节点
										</p>
									</div>
								</button>
							</div>
						</div>

						<div class="border-t border-white/10 px-5 pb-6 pt-5">
							<div class="mb-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
								<div>
									<p class="font-general-medium text-xs uppercase tracking-[0.3em] text-white/35">
										当前节点
									</p>
									<div class="mt-3 flex flex-wrap gap-2">
										<button
											v-for="item in activeTimelineYearItems"
											:key="item.id"
											type="button"
											@click="selectTimelineItem(item.id)"
											:aria-pressed="isActiveTimeline(item.id)"
											:class="[
												isActiveTimeline(item.id)
													? 'bg-white text-[#171717]'
													: 'bg-white/7 text-white/65 hover:bg-white/12 hover:text-white',
												'rounded-full px-4 py-2 text-sm transition'
											]"
										>
											{{ item.date }} {{ item.tag }}
										</button>
									</div>
								</div>
								<div class="flex items-center gap-2">
									<button
										type="button"
										@click="showPreviousTimeline"
										class="rounded-full bg-white/8 px-4 py-2 text-sm text-white/70 transition hover:bg-white/12 hover:text-white"
									>
										上一个
									</button>
									<button
										type="button"
										@click="showNextTimeline"
										class="rounded-full bg-white/8 px-4 py-2 text-sm text-white/70 transition hover:bg-white/12 hover:text-white"
									>
										下一个
									</button>
								</div>
							</div>

							<div class="grid gap-5 lg:grid-cols-[minmax(0,1.3fr)_20rem]">
								<article class="rounded-[2rem] bg-[#f3f1eb] p-6 text-[#202020] shadow-xl sm:p-8">
									<div class="flex flex-wrap items-center gap-3">
										<span class="font-general-semibold rounded-full bg-[#141414] px-4 py-1.5 text-sm text-white">
											{{ activeTimelineItem.date }}
										</span>
										<span class="font-general-medium rounded-full bg-[#ffe8e0] px-4 py-1.5 text-sm text-[#ff7963]">
											{{ activeTimelineItem.tag }}
										</span>
									</div>

									<h3 class="font-general-bold mt-5 text-3xl leading-tight sm:text-4xl">
										{{ activeTimelineItem.title }}
									</h3>

									<p class="font-general-regular mt-5 text-base leading-8 text-[#575757] sm:text-lg">
										{{ activeTimelineItem.text }}
									</p>
									<p class="font-general-regular mt-4 text-base leading-8 text-[#575757] sm:text-lg">
										{{ activeTimelineItem.detail }}
									</p>
								</article>

								<aside class="rounded-[2rem] bg-[#1a1a1a] p-6 ring-1 ring-white/10 sm:p-7">
									<p class="font-general-medium text-xs uppercase tracking-[0.3em] text-white/35">
										节点印象
									</p>
									<p class="font-general-bold mt-5 text-6xl leading-none text-white">
										{{ activeTimelineItem.year }}
									</p>
									<p class="font-general-medium mt-2 text-sm text-white/45">
										{{ activeTimelineIndex + 1 }}/{{ timeline.length }}
									</p>
									<p class="font-general-regular mt-6 text-lg leading-8 text-white/82">
										{{ activeTimelineItem.focus }}
									</p>

									<div class="mt-6 flex flex-wrap gap-2">
										<span
											v-for="keyword in activeTimelineItem.keywords"
											:key="keyword"
											class="font-general-medium rounded-full bg-white/8 px-3 py-1.5 text-sm text-white/72"
										>
											{{ keyword }}
										</span>
									</div>
								</aside>
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
