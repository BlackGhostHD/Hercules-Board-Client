import Home from "@/pages/Home";
import About from "@/pages/About";
import MyPrs from "@/pages/MyPrs";
import Login from "@/pages/Login";
import Settings from "@/pages/Settings";
import i18n from "../i18n";

const routes = [
	{
		path: "/dashboard",
		name: "dashboard",
		component: Home,
		icon: "airplay",
		meta: {
			displayName: i18n.t("routes.name.dashboard"),
			requiresNoAuth: true,
		},
	},
	{
		path: "/mypullrequests",
		name: "myPullRequest",
		component: MyPrs,
		icon: "merge_type",
		meta: {
			displayName: i18n.t("routes.name.myPullRequest"),
		},
	},
	{
		path: "/pullrequests",
		name: "pullrequests",
		component: About,
		icon: "timeline",
		meta: {
			displayName: i18n.t("routes.name.pullRequest"),
		},
	},
	{
		path: "/tools",
		name: "tools",
		component: About,
		icon: "build",
		meta: {
			displayName: i18n.t("routes.name.tools"),
		},
	},
	{
		path: "/settings",
		name: "settings",
		component: Settings,
		icon: "settings",
		meta: {
			displayName: i18n.t("routes.name.settings"),
		},
	},
	{
		path: "/*",
		name: "login",
		component: Login,
		meta: {
			layout: "noSidebarLayout",
			requiresNoAuth: true,
			hideForAuth: true,
			redirect: "dashboard",
		},
	},
];

export default routes;
