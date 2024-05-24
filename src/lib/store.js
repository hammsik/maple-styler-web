// @ts-nocheck
import { writable } from 'svelte/store';

function storeSession() {
	const { subscribe, set } = writable(null);
	return {
		subscribe,
		setSession: (session) => {
			console.log('세션 설정');
			console.log(session);
			set(session);
		}
	};
}

function storeSupabase() {
	const { subscribe, set } = writable(null);
	return {
		subscribe,
		setSupabase: (supabase) => {
			console.log('슈파베이스 설정');
			console.log(supabase);
			set(supabase);
		}
	};
}

function storeImageLoading() {
	const { subscribe, set } = writable(true);
	return {
		subscribe,
		setIsLoading: (bool) => {
			set(bool);
			console.log('로딩시작');
		}
	};
}

function currentBackgrond() {
	const { subscribe, set } = writable('null');
	return {
		subscribe,
		setBackground: (item) => set(item)
	};
}

function currentColor() {
	const { subscribe, update } = writable([0, 0]);
	return {
		subscribe,
		updateColor: (colorInput, idx) => {
			console.log(colorInput, idx);
			update((color) => {
				color[idx] = colorInput;
				return color;
			});
		}
	};
}

function createSelectedType() {
	const { subscribe, set } = writable('Hair');
	return {
		subscribe,
		setSelectedType: (item) => set(item)
	};
}

function createCharacter() {
	const { subscribe, update } = writable({
		// itemMap: {
		//뷰티
		Hair: ['68090', '허쉬 헤어', '0'],
		Face: ['50137', '차차 얼굴', '0'],
		Head: ['null', '홍조 꽃잎 피부'],
		Body: ['2016', 'null'],
		//장비
		Hat: ['null', 'null'],
		Overall: ['null', 'null'],
		Cash: ['null', 'null'],
		Top: ['1040036', '상의 이너'],
		Bottom: ['1060026', '하의 이너'],
		Cape: ['null', 'null'],
		Glove: ['null', 'null'],
		Shoes: ['null', 'null'],
		Shield: ['null', 'null'],
		//악세
		'Face Accessory': ['null', 'null'],
		'Eye Decoration': ['null', 'null'],
		Earrings: ['null', 'null'],

		itemQueue: [],
		itemQueueIndex: 0
	});

	return {
		subscribe,
		getCharacter: (itemMap) => {
			const itemsUrl = makeItemsUrl(itemMap);
			console.log(itemsUrl);
			return `https://maplestory.io/api/Character/${itemsUrl}/stand1/0/?renderMode=2`;
		},
		setCharacter: (item) =>
			update((itemMap) => {
				let itemId = item.id;
				if (typeof(item.id) === 'number') {
					itemId = item.id.toString();
				}
				if (itemId === itemMap[item.type][0]) {
					return itemMap;
				}

				//벗기기
				if (itemId === 'null') {
					if (item.type === 'Top') {
						itemMap['Top'] = ['1040036', '상의 이너'];
					} else if (item.type === 'Bottom') {
						itemMap['Bottom'] = ['1060026', '하의 이너'];
					} else {
						itemMap[item.type] = ['null', 'null'];
					}
				} else if (item.type === 'Overall') {
					itemMap['Top'] = ['1040036', '상의 이너'];
					itemMap['Bottom'] = ['1060026', '하의 이너'];
					itemMap[item.type] = [itemId, item.name];
				} else if (item.type === 'Top' || item.type === 'Bottom') {
					itemMap['Overall'] = ['null', 'null'];
					itemMap[item.type] = [itemId, item.name];
				} else {
					itemMap[item.type] = [itemId, item.name];
				}

				return itemMap;
			}),
		setBeauty: (color, type) =>
			update((itemMap) => {
				itemMap[type][2] = color;
				if (type === 'Hair') {
					const item = itemMap['Hair'][0];
					itemMap['Hair'][0] = item.substring(0, 4) + color + item.substring(5);
				} else {
					const item = itemMap['Face'][0];
					itemMap['Face'][0] = item.substring(0, 2) + color + item.substring(3);
				}
				return itemMap;
			})
	};
}

function addVersionAndRegion(item) {
	return `{"itemId":${item}, "version":"389","region":"KMS"},`;
}

function makeItemsUrl(itemMap) {
	let items = '';
	items += addVersionAndRegion(itemMap['Hair'][0]);
	items += addVersionAndRegion(itemMap['Face'][0]);
	items += addVersionAndRegion(itemMap['Head'][0]);
	items += addVersionAndRegion(itemMap['Body'][0]);
	if (itemMap['Hat'][0] !== 'null') {
		items += addVersionAndRegion(itemMap['Hat'][0]);
	}
	if (itemMap['Overall'][0] == 'null') {
		items += addVersionAndRegion(itemMap['Top'][0]);
		items += addVersionAndRegion(itemMap['Bottom'][0]);
	} else {
		items += addVersionAndRegion(itemMap['Overall'][0]);
	}
	if (itemMap['Cash'][0] !== 'null') {
		items += addVersionAndRegion(itemMap['Cash'][0]);
	}
	if (itemMap['Cape'][0] !== 'null') {
		items += addVersionAndRegion(itemMap['Cape'][0]);
	}
	if (itemMap['Glove'][0] !== 'null') {
		items += addVersionAndRegion(itemMap['Glove'][0]);
	}
	if (itemMap['Shoes'][0] !== 'null') {
		items += addVersionAndRegion(itemMap['Shoes'][0]);
	}
	if (itemMap['Shield'][0] !== 'null') {
		items += addVersionAndRegion(itemMap['Shield'][0]);
	}
	if (itemMap['Face Accessory'][0] !== 'null') {
		items += addVersionAndRegion(itemMap['Face Accessory'][0]);
	}
	if (itemMap['Eye Decoration'][0] !== 'null') {
		items += addVersionAndRegion(itemMap['Eye Decoration'][0]);
	}
	if (itemMap['Earrings'][0] !== 'null') {
		items += addVersionAndRegion(itemMap['Earrings'][0]);
	}

	return items;
}

export const dodo = createCharacter();
export const selectedType = createSelectedType();
export const currentBackground = currentBackgrond();
export const currentBeautyColor = currentColor();
export const isImageLoading = storeImageLoading();
export const sessionTmp = storeSession();
export const supabaseTmp = storeSupabase();
