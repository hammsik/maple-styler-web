// @ts-nocheck
import { writable } from 'svelte/store';

function currentBackgrond() {
	const { subscribe, set, update } = writable('null');
	return {
		subscribe,
		setBackground: (item) => set(item)
	};
}

function currentColor() {
	const { subscribe, set, update } = writable([0, 0]);
	return {
		subscribe,
		updateColor: (colorInput, idx) =>{
			console.log(colorInput, idx)
			update((color) => {
				color[idx] = colorInput;
				return color;
			})
		}
	};
}

function createSelectedType() {
	const { subscribe, set, update } = writable('Hair');
	return {
		subscribe,
		setSelectedType: (item) => set(item)
	};
}

function createCharacter() {
	const { subscribe, set, update } = writable({
		// itemMap: {
		//뷰티
		Hair: ['68090', '허쉬 헤어', '0'],
		Face: ['50137', '차차 얼굴', '0'],
		Head: ['12016', '홍조 꽃잎 피부'],
		Body: ['2016', 'null'],
		//장비
		Hat: ['null', 'null'],
		Overall: ['null', 'null'],
		Cash: ['1702565', 'null'],
		Top: ['1040036', '상의 이너'],
		Bottom: ['1060026', '하의 이너'],
		Cape: ['1103126', 'null'],
		Glove: ['null', 'null'],
		Shoes: ['null', 'null'],
		Shield: ['null', 'null'],
		//악세
		'Face Accessory': ['null', 'null'],
		'Eye Decoration': ['null', 'null'],
		Earrings: ['null', 'null']

		// itemQueue: [],
		// itemQueueIndex: 0
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
				if (item.id === 'null') {
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
					itemMap[item.type] = [item.id, item.name];
				} else if (item.type === 'Top' || item.type === 'Bottom') {
					itemMap['Overall'] = ['null', 'null'];
					itemMap[item.type] = [item.id, item.name];
				} else {
					itemMap[item.type] = [item.id, item.name];
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
