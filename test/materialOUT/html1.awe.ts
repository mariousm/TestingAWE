import * as awe from "testing-awe";

export const dashboardTitle = new awe.H('#dashboard_title');
export const dashboardDiv = new awe.Div('#dashboard_div');
export function dashboardADetailsHero(param1 : string) : awe.A {
	let id : string = '#' + 'dashboard_a_details_hero_' + param1;
	return new awe.A(id)
};
export function dashboardDivDetailHero(param1 : string) : awe.Div {
	let id : string = '#' + 'dashboard_div_detail_hero_' + param1;
	return new awe.Div(id)
};
export function dashboardH4DetailHeroName(param1 : string) : awe.H {
	let id : string = '#' + 'dashboard_h4_detail_hero_name_' + param1;
	return new awe.H(id)
};
