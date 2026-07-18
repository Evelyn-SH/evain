<script setup>
import { computed, onMounted, ref } from 'vue';

const boardSpaces = [
	{ label: '起点', type: 'start', icon: '⌂', color: 'yellow', row: 1, col: 1 },
	{ label: '小机会', type: 'opportunity', icon: '◆', color: 'green', row: 1, col: 2 },
	{ label: '账单', type: 'expense', icon: '!', color: 'red', row: 1, col: 3 },
	{ label: '副业', type: 'side', icon: '+', color: 'blue', row: 1, col: 4 },
	{ label: '发薪日', type: 'payday', icon: '¥', color: 'yellow', row: 1, col: 5 },
	{ label: '大学习', type: 'learning', icon: '↗', color: 'purple', row: 2, col: 5 },
	{ label: '大机会', type: 'opportunity', icon: '★', color: 'green', row: 3, col: 5 },
	{ label: '市场', type: 'market', icon: '≈', color: 'blue', row: 4, col: 5 },
	{ label: '意外', type: 'expense', icon: '!', color: 'red', row: 5, col: 5 },
	{ label: '小机会', type: 'opportunity', icon: '◆', color: 'green', row: 5, col: 4 },
	{ label: '副业', type: 'side', icon: '+', color: 'blue', row: 5, col: 3 },
	{ label: '发薪日', type: 'payday', icon: '¥', color: 'yellow', row: 5, col: 2 },
	{ label: '人情账', type: 'expense', icon: '!', color: 'red', row: 5, col: 1 },
	{ label: '学习', type: 'learning', icon: '↗', color: 'purple', row: 4, col: 1 },
	{ label: '大机会', type: 'opportunity', icon: '★', color: 'green', row: 3, col: 1 },
	{ label: '市场', type: 'market', icon: '≈', color: 'blue', row: 2, col: 1 },
];

const opportunities = [
	{ title: '社区自动售货机', cost: 6800, income: 420, icon: '🥤', note: '一台不睡觉的小机器，每月自动进账。' },
	{ title: '停车位出租权', cost: 12800, income: 760, icon: '🅿️', note: '位置普通，但现金流相当老实。' },
	{ title: '周末烘焙摊', cost: 4600, income: 300, icon: '🥐', note: '把爱好变成一条细小但稳定的河。' },
	{ title: '指数基金份额', cost: 9200, income: 520, icon: '📈', note: '不追热点，只买一篮子耐心。' },
	{ title: '迷你储物仓', cost: 17600, income: 980, icon: '📦', note: '不起眼的方盒子，也能替你工作。' },
	{ title: '知识付费小课', cost: 7600, income: 470, icon: '🎧', note: '一次制作，重复出售你的经验。' },
];

const expenseEvents = [
	{ title: '手机突然罢工', amount: 1800, note: '生活总会从最薄弱的屏幕裂开一道口子。' },
	{ title: '冲动消费夜', amount: 1200, note: '购物车赢了这一局，现金流输了。' },
	{ title: '宠物急诊', amount: 2300, note: '有些账单不该后悔，只该提前准备。' },
	{ title: '房租上涨', amount: 900, expenseDelta: 300, note: '这次不只付钱，今后的跑道也更陡了一点。' },
	{ title: '朋友的婚礼', amount: 1600, note: '祝福是真的，红包也是真的。' },
];

const status = ref('ready');
const turn = ref(0);
const position = ref(0);
const cash = ref(12000);
const salary = ref(8500);
const passiveIncome = ref(0);
const expenses = ref(6500);
const knowledge = ref(0);
const assets = ref([]);
const dice = ref(null);
const isRolling = ref(false);
const currentEvent = ref(null);
const activity = ref([]);
const bestTurn = ref(null);

const monthlyBalance = computed(() => salary.value + passiveIncome.value - expenses.value);
const freedomProgress = computed(() => Math.min(100, Math.round((passiveIncome.value / expenses.value) * 100)));
const currentSpace = computed(() => boardSpaces[position.value]);
const canRoll = computed(() => status.value === 'playing' && !isRolling.value && !currentEvent.value);

function formatMoney(value) {
	return new Intl.NumberFormat('zh-CN').format(Math.round(value));
}

function addActivity(text, tone = 'neutral') {
	activity.value.unshift({ id: `${Date.now()}-${Math.random()}`, text, tone });
	activity.value = activity.value.slice(0, 5);
}

function startGame() {
	status.value = 'playing';
	turn.value = 0;
	position.value = 0;
	cash.value = 12000;
	salary.value = 8500;
	passiveIncome.value = 0;
	expenses.value = 6500;
	knowledge.value = 0;
	assets.value = [];
	dice.value = null;
	currentEvent.value = null;
	activity.value = [];
	addActivity('你带着 ¥12,000 和一个目标进入鼠圈：让钱替你工作。', 'good');
}

function checkGameState() {
	if (passiveIncome.value >= expenses.value) {
		status.value = 'won';
		if (!bestTurn.value || turn.value < bestTurn.value) {
			bestTurn.value = turn.value;
			localStorage.setItem('rat-race-best-turn', String(turn.value));
		}
	} else if (cash.value < -8000) {
		status.value = 'lost';
	}
}

function closeEvent() {
	currentEvent.value = null;
	checkGameState();
}

function resolveSpace(space) {
	if (space.type === 'opportunity') {
		const offer = opportunities[(turn.value + position.value + assets.value.length) % opportunities.length];
		currentEvent.value = { type: 'opportunity', ...offer };
		return;
	}

	if (space.type === 'expense') {
		const event = expenseEvents[(turn.value + position.value) % expenseEvents.length];
		cash.value -= event.amount;
		if (event.expenseDelta) expenses.value += event.expenseDelta;
		addActivity(`${event.title}：支出 ¥${formatMoney(event.amount)}${event.expenseDelta ? '，固定支出上升' : ''}。`, 'bad');
		currentEvent.value = { type: 'expense', ...event };
		return;
	}

	if (space.type === 'learning') {
		currentEvent.value = {
			type: 'learning',
			title: '财商训练营',
			cost: 1400,
			note: '花钱升级自己：工资 +¥600，副业收益也会提高。',
		};
		return;
	}

	if (space.type === 'side') {
		const gain = 900 + knowledge.value * 450;
		cash.value += gain;
		addActivity(`完成一份副业，赚到 ¥${formatMoney(gain)}。`, 'good');
		currentEvent.value = { type: 'side', title: '今晚不刷短视频', amount: gain, note: '你把两个小时变成了一小笔种子资金。' };
		return;
	}

	if (space.type === 'payday') {
		const bonus = 1200 + knowledge.value * 200;
		cash.value += bonus;
		addActivity(`项目奖金到账：+¥${formatMoney(bonus)}。`, 'good');
		currentEvent.value = { type: 'payday', title: '额外奖金到账', amount: bonus, note: '工资能让你喘息，但资产才能让你离开跑道。' };
		return;
	}

	if (space.type === 'market') {
		if (assets.value.length) {
			const boost = Math.max(100, Math.round(passiveIncome.value * 0.08));
			passiveIncome.value += boost;
			addActivity(`市场回暖，资产每月多带来 ¥${formatMoney(boost)}。`, 'good');
			currentEvent.value = { type: 'market', title: '市场吹来顺风', amount: boost, note: '你持有的资产正在长大，被动收入获得小幅提升。' };
		} else {
			cash.value += 500;
			addActivity('没有资产可升值，捡到一张 ¥500 优惠补贴。');
			currentEvent.value = { type: 'market', title: '你还没有资产', amount: 500, note: '市场的风吹过来了，可惜你的船还没下水。' };
		}
	}
}

function rollDice() {
	if (!canRoll.value) return;

	isRolling.value = true;
	let flashes = 0;
	const animation = window.setInterval(() => {
		dice.value = Math.floor(Math.random() * 4) + 1;
		flashes += 1;
		if (flashes < 8) return;

		window.clearInterval(animation);
		turn.value += 1;
		const settlement = monthlyBalance.value;
		cash.value += settlement;
		position.value = (position.value + dice.value) % boardSpaces.length;
		addActivity(`第 ${turn.value} 月结算：现金流 ${settlement >= 0 ? '+' : '-'}¥${formatMoney(Math.abs(settlement))}。`, settlement >= 0 ? 'good' : 'bad');
		isRolling.value = false;
		window.setTimeout(() => resolveSpace(currentSpace.value), 260);
	}, 70);
}

function buyOpportunity() {
	if (!currentEvent.value || cash.value < currentEvent.value.cost) return;

	const asset = {
		id: `${Date.now()}-${assets.value.length}`,
		title: currentEvent.value.title,
		income: currentEvent.value.income,
		icon: currentEvent.value.icon,
	};
	cash.value -= currentEvent.value.cost;
	passiveIncome.value += currentEvent.value.income;
	assets.value.push(asset);
	addActivity(`买入「${asset.title}」，被动收入 +¥${formatMoney(asset.income)}/月。`, 'good');
	closeEvent();
}

function takeTraining() {
	if (!currentEvent.value || cash.value < currentEvent.value.cost) return;
	cash.value -= currentEvent.value.cost;
	knowledge.value += 1;
	salary.value += 600;
	addActivity(`完成第 ${knowledge.value} 次学习，主动收入 +¥600/月。`, 'good');
	closeEvent();
}

onMounted(() => {
	const saved = Number(localStorage.getItem('rat-race-best-turn'));
	bestTurn.value = saved || null;
});
</script>

<template>
	<main class="game-shell">
		<div class="paper-noise" aria-hidden="true"></div>

		<header class="topbar">
			<a class="brand" href="#" aria-label="鼠圈生存指南">
				<span class="brand-mark">R</span>
				<span><strong>鼠圈生存指南</strong><small>THE RAT RACE</small></span>
			</a>
			<div class="topbar-meta">
				<span v-if="bestTurn">最佳纪录 <strong>{{ bestTurn }} 个月</strong></span>
				<button class="text-button" type="button" @click="startGame">重新开始 ↻</button>
			</div>
		</header>

		<section class="hero-copy">
			<div><p class="eyebrow">一场关于选择，而不是运气的游戏</p><h1>别只顾着跑。<br><em>想办法离开跑道。</em></h1></div>
			<p class="intro">每个月，工资把你往前推，账单又把你拉回来。买下能产生现金流的资产，当被动收入覆盖生活支出，你就自由了。</p>
		</section>

		<section class="game-layout">
			<aside class="dashboard panel">
				<div class="panel-title"><span>你的仪表盘</span><b>第 {{ turn }} 月</b></div>
				<div class="cash-card">
					<span>可用现金</span><strong :class="{ negative: cash < 0 }">¥{{ formatMoney(cash) }}</strong>
					<small>本月净现金流 <b :class="monthlyBalance >= 0 ? 'positive' : 'negative'">{{ monthlyBalance >= 0 ? '+' : '-' }}¥{{ formatMoney(Math.abs(monthlyBalance)) }}</b></small>
				</div>
				<div class="ledger">
					<div><span>主动收入</span><b>¥{{ formatMoney(salary) }}</b></div>
					<div><span>被动收入</span><b class="positive">¥{{ formatMoney(passiveIncome) }}</b></div>
					<div><span>固定支出</span><b class="negative">−¥{{ formatMoney(expenses) }}</b></div>
				</div>
				<div class="freedom-meter">
					<div class="meter-copy"><span>财务自由进度</span><b>{{ freedomProgress }}%</b></div>
					<div class="meter-track"><i :style="{ width: `${freedomProgress}%` }"></i></div>
					<small>还差 ¥{{ formatMoney(Math.max(0, expenses - passiveIncome)) }}/月</small>
				</div>
				<div class="asset-list">
					<div class="subheading"><span>我的资产</span><b>{{ assets.length }}</b></div>
					<div v-if="!assets.length" class="empty-state">你的钱还在睡觉。<br>在绿色机会格叫醒它。</div>
					<div v-for="asset in assets" :key="asset.id" class="asset-row"><span>{{ asset.icon }}</span><p>{{ asset.title }}<small>+¥{{ formatMoney(asset.income) }}/月</small></p></div>
				</div>
			</aside>

			<div class="board-wrap panel">
				<div class="board" :class="{ rolling: isRolling }">
					<div v-for="(space, index) in boardSpaces" :key="space.label + index" class="board-space" :class="[`space-${space.color}`, { active: position === index }]" :style="{ gridRow: space.row, gridColumn: space.col }">
						<span class="space-icon">{{ space.icon }}</span><small>{{ space.label }}</small>
						<div v-if="position === index" class="mouse-token" aria-label="玩家位置">🐭</div>
					</div>
					<div class="board-center">
						<div class="orbit orbit-one"></div><div class="orbit orbit-two"></div>
						<div class="center-copy"><span>当前停在</span><strong>{{ currentSpace.label }}</strong><p>被动收入<br><b>¥{{ formatMoney(passiveIncome) }}</b> / ¥{{ formatMoney(expenses) }}</p></div>
					</div>
				</div>
				<div class="control-deck">
					<div class="dice" :class="{ shaking: isRolling }"><span>{{ dice || '?' }}</span><small>1—4</small></div>
					<div class="turn-copy"><span>NEXT MOVE</span><strong v-if="status === 'ready'">准备进入鼠圈</strong><strong v-else-if="currentEvent">先处理眼前的事件</strong><strong v-else>结算下个月并前进</strong><small>工资 + 被动收入 − 固定支出</small></div>
					<button class="roll-button" type="button" :disabled="!canRoll" @click="rollDice">{{ isRolling ? '命运滚动中…' : '投骰子' }} <span>→</span></button>
				</div>
			</div>

			<aside class="activity-panel panel">
				<div class="panel-title"><span>现金流记录</span><b>LIVE</b></div>
				<div class="activity-list">
					<div v-for="item in activity" :key="item.id" class="activity-item" :class="item.tone"><i></i><p>{{ item.text }}</p></div>
					<div v-if="!activity.length" class="empty-state">开始游戏后，你的每个财务选择都会留在这里。</div>
				</div>
				<div class="tip-card"><span>本轮提示</span><p>高工资不等于自由。<br><strong>现金流</strong>才是出口。</p><div class="cheese">🧀</div></div>
			</aside>
		</section>

		<footer class="game-footer"><span>原创财务启蒙小游戏 · 不构成投资建议</span><span>目标：被动收入 ≥ 固定支出</span></footer>

		<div v-if="status === 'ready'" class="modal-backdrop">
			<section class="start-card modal-card">
				<div class="modal-stamp">HOW TO ESCAPE</div><div class="start-mouse">🐭</div><p class="eyebrow">欢迎来到鼠圈</p>
				<h2>你每月赚 ¥8,500，<br>但生活要拿走 ¥6,500。</h2>
				<p>靠工资，你可以一直跑。靠资产，你才有机会停下来。用手里的 ¥12,000 做出第一笔选择。</p>
				<div class="rules-row"><span><b>01</b> 投骰前进</span><span><b>02</b> 买入资产</span><span><b>03</b> 覆盖支出</span></div>
				<button class="primary-button" type="button" @click="startGame">进入鼠圈 <span>→</span></button>
			</section>
		</div>

		<div v-if="currentEvent" class="modal-backdrop">
			<section class="event-card modal-card" :class="`event-${currentEvent.type}`">
				<div class="event-kicker">{{ currentSpace.label }} · 第 {{ turn }} 月</div>
				<div class="event-icon">{{ currentEvent.icon || (currentEvent.type === 'expense' ? '🧾' : currentEvent.type === 'learning' ? '📚' : currentEvent.type === 'side' ? '🛠️' : currentEvent.type === 'payday' ? '💰' : '🌬️') }}</div>
				<h2>{{ currentEvent.title }}</h2><p>{{ currentEvent.note }}</p>
				<div v-if="currentEvent.type === 'opportunity'" class="event-numbers"><div><span>买入价格</span><b>¥{{ formatMoney(currentEvent.cost) }}</b></div><div><span>每月现金流</span><b class="positive">+¥{{ formatMoney(currentEvent.income) }}</b></div></div>
				<div v-else-if="currentEvent.type === 'expense'" class="event-numbers single"><div><span>现金减少</span><b class="negative">−¥{{ formatMoney(currentEvent.amount) }}</b></div></div>
				<div v-else-if="currentEvent.amount" class="event-numbers single"><div><span>本次收获</span><b class="positive">+¥{{ formatMoney(currentEvent.amount) }}</b></div></div>
				<div class="event-actions">
					<template v-if="currentEvent.type === 'opportunity'"><button class="secondary-button" type="button" @click="closeEvent">放弃机会</button><button class="primary-button" type="button" :disabled="cash < currentEvent.cost" @click="buyOpportunity">{{ cash < currentEvent.cost ? '现金不足' : '买入资产' }}</button></template>
					<template v-else-if="currentEvent.type === 'learning'"><button class="secondary-button" type="button" @click="closeEvent">这次不学</button><button class="primary-button" type="button" :disabled="cash < currentEvent.cost" @click="takeTraining">花 ¥{{ formatMoney(currentEvent.cost) }} 学习</button></template>
					<button v-else class="primary-button full" type="button" @click="closeEvent">继续前进 →</button>
				</div>
			</section>
		</div>

		<div v-if="status === 'won' || status === 'lost'" class="modal-backdrop">
			<section class="result-card modal-card" :class="status">
				<div class="result-icon">{{ status === 'won' ? '🧀' : '🕳️' }}</div><p class="eyebrow">{{ status === 'won' ? 'FINANCIAL FREEDOM' : 'CASHFLOW CRISIS' }}</p><h2>{{ status === 'won' ? '你跳出了鼠圈！' : '现金流断了。' }}</h2>
				<p v-if="status === 'won'">第 {{ turn }} 个月，你的资产每月带来 ¥{{ formatMoney(passiveIncome) }}，已经足够支付生活。你终于可以决定如何使用时间。</p><p v-else>负债超过了安全线。下一次少追逐消费，多留意能持续产生现金流的机会。</p>
				<div class="result-stats"><span><b>{{ turn }}</b>个月</span><span><b>{{ assets.length }}</b>项资产</span><span><b>{{ freedomProgress }}%</b>自由度</span></div>
				<button class="primary-button" type="button" @click="startGame">再跑一局 <span>↻</span></button>
			</section>
		</div>
	</main>
</template>

<style scoped>
.game-shell { position: relative; min-height: 100vh; overflow: hidden; background: #f2eadb; color: #191a17; padding: 0 28px; }
.paper-noise { position: fixed; inset: 0; pointer-events: none; opacity: .24; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.16'/%3E%3C/svg%3E"); mix-blend-mode: multiply; z-index: 20; }
.topbar, .hero-copy, .game-layout, .game-footer { position: relative; z-index: 1; max-width: 1540px; margin-inline: auto; }
.topbar { height: 78px; display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #191a17; }
.brand { display: flex; align-items: center; gap: 11px; color: inherit; text-decoration: none; text-align: left; }
.brand-mark { width: 38px; height: 38px; display: grid; place-items: center; border-radius: 50%; background: #191a17; color: #f6b91b; font: 800 23px/1 Georgia, serif; transform: rotate(-8deg); }
.brand strong { display: block; font-size: 15px; letter-spacing: .08em; }
.brand small { display: block; margin-top: 2px; font-size: 9px; letter-spacing: .28em; opacity: .58; }
.topbar-meta { display: flex; align-items: center; gap: 22px; font-size: 12px; }
.text-button { border: 0; background: transparent; color: inherit; cursor: pointer; font-weight: 700; }
.hero-copy { display: grid; grid-template-columns: 1.5fr .7fr; align-items: end; gap: 60px; padding: 34px 0 30px; }
.eyebrow { margin: 0 0 10px; color: #d84b2f; font-size: 11px; font-weight: 800; letter-spacing: .18em; text-transform: uppercase; }
.hero-copy h1 { margin: 0; font-size: clamp(42px, 5vw, 76px); line-height: .94; letter-spacing: -.055em; font-weight: 800; }
.hero-copy h1 em { color: #31735d; font-family: Georgia, 'Songti SC', serif; font-weight: 400; }
.intro { margin: 0 0 5px; max-width: 510px; font-size: 14px; line-height: 1.8; opacity: .72; }
.game-layout { display: grid; grid-template-columns: 230px minmax(520px, 1fr) 230px; gap: 14px; align-items: stretch; }
.panel { border: 2px solid #191a17; background: rgba(255, 252, 244, .62); box-shadow: 4px 4px 0 rgba(25, 26, 23, .12); }
.panel-title { height: 43px; display: flex; align-items: center; justify-content: space-between; padding: 0 14px; border-bottom: 2px solid #191a17; font-size: 10px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
.panel-title b { color: #d84b2f; font-size: 9px; }
.dashboard { display: flex; flex-direction: column; }
.cash-card { margin: 12px; padding: 14px; color: #f8f1e4; background: #1e322b; text-align: left; }
.cash-card span, .cash-card small { display: block; font-size: 10px; opacity: .7; }
.cash-card strong { display: block; margin: 5px 0 7px; font: 700 25px/1 Georgia, serif; }
.cash-card small b { color: #f6b91b; }
.positive { color: #31735d !important; }
.negative { color: #d84b2f !important; }
.ledger { padding: 0 12px 12px; }
.ledger div { display: flex; justify-content: space-between; padding: 8px 2px; border-bottom: 1px dashed rgba(25,26,23,.3); font-size: 11px; }
.ledger b { font-family: Georgia, serif; }
.freedom-meter { padding: 13px 14px; border-block: 2px solid #191a17; text-align: left; background: #f7efd9; }
.meter-copy { display: flex; justify-content: space-between; font-size: 10px; font-weight: 800; }
.meter-track { height: 9px; margin: 9px 0 6px; padding: 2px; border: 1px solid #191a17; background: #fffaf0; }
.meter-track i { display: block; height: 100%; max-width: 100%; background: #f6b91b; transition: width .5s ease; }
.freedom-meter small { font-size: 9px; opacity: .6; }
.asset-list { min-height: 166px; padding: 12px; text-align: left; }
.subheading { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 10px; font-weight: 800; text-transform: uppercase; }
.subheading b { display: grid; place-items: center; width: 18px; height: 18px; border-radius: 50%; background: #191a17; color: white; }
.empty-state { padding: 20px 10px; border: 1px dashed rgba(25,26,23,.35); color: rgba(25,26,23,.48); font-size: 10px; line-height: 1.7; text-align: center; }
.asset-row { display: flex; align-items: center; gap: 9px; padding: 7px 0; border-bottom: 1px dashed rgba(25,26,23,.25); }
.asset-row > span { width: 27px; height: 27px; display: grid; place-items: center; background: #e9dfc9; }
.asset-row p { margin: 0; font-size: 10px; font-weight: 700; }
.asset-row small { display: block; margin-top: 2px; color: #31735d; font-size: 9px; }
.board-wrap { padding: 12px; }
.board { position: relative; display: grid; grid-template: repeat(5, minmax(74px, 1fr)) / repeat(5, minmax(74px, 1fr)); aspect-ratio: 1.36; max-height: 600px; border: 2px solid #191a17; background: #e8deca; }
.board-space { position: relative; min-width: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; border: 1px solid rgba(25,26,23,.72); transition: transform .2s ease, filter .2s ease; }
.board-space.active { z-index: 4; filter: saturate(1.2); outline: 3px solid #191a17; outline-offset: -4px; }
.space-icon { font: 700 20px/1 Georgia, serif; }
.board-space small { font-size: 9px; font-weight: 800; }
.space-yellow { background: #f3c63a; }.space-green { background: #79a98d; }.space-red { background: #dc725c; }.space-blue { background: #83aeb5; }.space-purple { background: #9d8eb3; }
.mouse-token { position: absolute; right: -7px; bottom: -7px; width: 35px; height: 35px; display: grid; place-items: center; border: 2px solid #191a17; border-radius: 50%; background: #fff9eb; font-size: 19px; filter: drop-shadow(2px 2px 0 rgba(25,26,23,.25)); animation: token-pop .32s ease; }
@keyframes token-pop { from { transform: scale(.5) rotate(-30deg); } to { transform: scale(1) rotate(0); } }
.board-center { grid-area: 2 / 2 / 5 / 5; position: relative; overflow: hidden; display: grid; place-items: center; background: #243f36; color: #f3ead9; border: 1px solid #191a17; }
.orbit { position: absolute; border: 1px solid rgba(246,185,27,.38); border-radius: 50%; }.orbit-one { width: 73%; aspect-ratio: 1; }.orbit-two { width: 48%; aspect-ratio: 1; border-style: dashed; animation: spin 16s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.center-copy { position: relative; z-index: 1; text-align: center; }.center-copy > span { font-size: 9px; letter-spacing: .18em; text-transform: uppercase; opacity: .6; }.center-copy > strong { display: block; margin: 4px 0 14px; color: #f6b91b; font: 400 clamp(21px, 2.5vw, 36px)/1 Georgia, 'Songti SC', serif; }.center-copy p { margin: 0; font-size: 9px; line-height: 1.55; opacity: .72; }.center-copy p b { color: white; font-size: 12px; }
.control-deck { min-height: 76px; display: grid; grid-template-columns: 64px 1fr 150px; align-items: center; margin-top: 10px; border: 2px solid #191a17; background: #f8f1e4; }
.dice { height: 100%; display: grid; place-items: center; align-content: center; border-right: 2px solid #191a17; background: #f3c63a; }.dice span { font: 700 26px/1 Georgia, serif; }.dice small { margin-top: 3px; font-size: 8px; }.dice.shaking { animation: shake .2s linear infinite; }
@keyframes shake { 50% { transform: rotate(3deg) scale(.96); } }
.turn-copy { padding: 0 17px; text-align: left; }.turn-copy > span { display: block; color: #d84b2f; font-size: 8px; font-weight: 800; letter-spacing: .18em; }.turn-copy strong { display: block; margin: 3px 0; font-size: 12px; }.turn-copy small { display: block; font-size: 9px; opacity: .5; }
.roll-button { align-self: stretch; border: 0; border-left: 2px solid #191a17; background: #d84b2f; color: white; cursor: pointer; font-size: 13px; font-weight: 800; transition: background .2s, color .2s; }.roll-button:hover:not(:disabled) { background: #191a17; color: #f6b91b; }.roll-button:disabled { cursor: not-allowed; opacity: .45; }.roll-button span { margin-left: 8px; }
.activity-panel { display: flex; flex-direction: column; }.activity-list { flex: 1; min-height: 260px; padding: 12px; }.activity-item { display: grid; grid-template-columns: 8px 1fr; gap: 8px; padding: 9px 0; border-bottom: 1px dashed rgba(25,26,23,.25); text-align: left; }.activity-item i { width: 7px; height: 7px; margin-top: 4px; border: 1px solid #191a17; border-radius: 50%; background: #e5d9c1; }.activity-item.good i { background: #70a489; }.activity-item.bad i { background: #dc725c; }.activity-item p { margin: 0; font-size: 10px; line-height: 1.5; }
.tip-card { position: relative; margin: 12px; min-height: 126px; overflow: hidden; padding: 15px; background: #f3c63a; border: 2px solid #191a17; text-align: left; }.tip-card > span { font-size: 8px; font-weight: 800; letter-spacing: .18em; }.tip-card p { position: relative; z-index: 1; margin: 16px 0 0; font: 17px/1.3 Georgia, 'Songti SC', serif; }.cheese { position: absolute; right: -7px; bottom: -13px; font-size: 64px; transform: rotate(-15deg); filter: grayscale(.15); }
.game-footer { display: flex; justify-content: space-between; padding: 19px 0 28px; font-size: 9px; letter-spacing: .06em; opacity: .58; }
.modal-backdrop { position: fixed; inset: 0; z-index: 30; display: grid; place-items: center; padding: 20px; background: rgba(22,29,25,.78); backdrop-filter: blur(7px); }
.modal-card { position: relative; width: min(500px, 100%); padding: 34px; border: 2px solid #191a17; background: #f7efdf; box-shadow: 10px 10px 0 rgba(0,0,0,.28); text-align: center; animation: modal-in .28s ease both; }
@keyframes modal-in { from { opacity: 0; transform: translateY(18px) rotate(-1deg); } }
.modal-card h2 { margin: 0 0 14px; font: 400 30px/1.16 Georgia, 'Songti SC', serif; }.modal-card > p:not(.eyebrow) { max-width: 390px; margin: 0 auto; font-size: 12px; line-height: 1.75; opacity: .7; }.modal-stamp { position: absolute; top: 18px; left: 18px; padding: 5px 8px; border: 1px solid #191a17; font-size: 8px; font-weight: 800; letter-spacing: .14em; transform: rotate(-4deg); }.start-mouse, .event-icon, .result-icon { margin: 4px 0 17px; font-size: 58px; filter: drop-shadow(3px 4px 0 rgba(25,26,23,.16)); }
.rules-row { display: grid; grid-template-columns: repeat(3, 1fr); margin: 25px 0; border-block: 1px solid rgba(25,26,23,.25); }.rules-row span { padding: 12px 5px; font-size: 9px; font-weight: 700; }.rules-row b { display: block; margin-bottom: 4px; color: #d84b2f; font: 700 15px/1 Georgia, serif; }
.primary-button, .secondary-button { min-height: 46px; padding: 0 22px; border: 2px solid #191a17; cursor: pointer; font-size: 11px; font-weight: 800; }.primary-button { background: #d84b2f; color: white; box-shadow: 3px 3px 0 #191a17; }.primary-button:hover:not(:disabled) { background: #191a17; color: #f6b91b; }.primary-button:disabled { opacity: .38; cursor: not-allowed; }.primary-button span { margin-left: 15px; }.secondary-button { background: transparent; }
.event-kicker { color: #d84b2f; font-size: 9px; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; }.event-icon { margin-top: 17px; }.event-numbers { display: grid; grid-template-columns: repeat(2, 1fr); margin: 24px 0; border: 2px solid #191a17; }.event-numbers.single { grid-template-columns: 1fr; }.event-numbers div { padding: 13px; text-align: left; }.event-numbers div + div { border-left: 1px solid #191a17; }.event-numbers span { display: block; margin-bottom: 4px; font-size: 9px; opacity: .55; }.event-numbers b { font: 700 18px/1 Georgia, serif; }.event-actions { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }.event-actions .full { grid-column: 1 / -1; }
.result-card.won { background: #f3c63a; }.result-card.lost { background: #e8c6ba; }.result-stats { display: flex; justify-content: center; gap: 27px; margin: 25px 0; }.result-stats span { font-size: 9px; }.result-stats b { display: block; margin-bottom: 4px; font: 700 22px/1 Georgia, serif; }
@media (max-width: 1120px) { .game-layout { grid-template-columns: 210px 1fr; }.activity-panel { grid-column: 1 / -1; display: grid; grid-template-columns: 1fr 230px; }.activity-panel .panel-title { grid-column: 1 / -1; }.activity-list { min-height: 120px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 0 18px; } }
@media (max-width: 780px) { .game-shell { padding: 0 14px; }.topbar { height: 66px; }.topbar-meta > span { display: none; }.hero-copy { display: block; padding: 28px 0 23px; }.hero-copy h1 { font-size: clamp(39px, 12vw, 62px); }.intro { margin-top: 20px; }.game-layout { display: flex; flex-direction: column; }.board-wrap { order: -1; padding: 7px; }.board { grid-template: repeat(5, minmax(54px, 1fr)) / repeat(5, minmax(54px, 1fr)); aspect-ratio: 1; }.board-space small { font-size: 7px; }.space-icon { font-size: 16px; }.mouse-token { width: 29px; height: 29px; font-size: 15px; }.center-copy > strong { font-size: 23px; }.control-deck { grid-template-columns: 54px 1fr 100px; }.turn-copy { padding: 0 10px; }.turn-copy small { display: none; }.activity-panel { display: flex; }.activity-list { display: block; min-height: 100px; }.game-footer { gap: 15px; } }
@media (max-width: 470px) { .brand strong { font-size: 13px; }.brand small { letter-spacing: .18em; }.text-button { font-size: 10px; }.board { grid-template: repeat(5, minmax(48px, 1fr)) / repeat(5, minmax(48px, 1fr)); }.board-space small { max-width: 45px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }.center-copy p { display: none; }.control-deck { grid-template-columns: 48px 1fr 86px; min-height: 66px; }.roll-button { font-size: 11px; }.turn-copy strong { font-size: 10px; }.modal-card { padding: 28px 20px; }.modal-card h2 { font-size: 25px; }.rules-row span { font-size: 8px; }.event-actions { grid-template-columns: 1fr; }.event-actions .full { grid-column: auto; } }
</style>
