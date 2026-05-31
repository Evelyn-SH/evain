import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const BASE_URL = import.meta.env.BASE_URL;

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		meta: {
			title: '周海卫 | Evain',
		},
	},
	{
		path: '/about',
		name: 'About',
		component: () => import('../views/About.vue'),
		meta: {
			title: '关于 | 周海卫',
		},
	},
];

const router = createRouter({
	history: createWebHistory(BASE_URL),
	routes,
	scrollBehavior() {
		document.getElementById('app').scrollIntoView();
	},
});

router.beforeEach((to, from, next) => {
	const nearestWithTitle = to.matched
		.slice()
		.reverse()
		.find((r) => r.meta && r.meta.title);

	if (nearestWithTitle) {
		document.title = nearestWithTitle.meta.title;
	}

	next();
});

export default router;
