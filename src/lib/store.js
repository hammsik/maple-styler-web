// @ts-nocheck
import { writable } from 'svelte/store';

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
		// },
		// // itemMap을 json으로 encode하여 itemQueue에 저장해야 한다.
		// itemQueue: [],
		// itemQueueIndex: 0
	});

	return {
		subscribe,
        getCharacter: (itemMap) => {
            const itemsUrl = makeItemsUrl(itemMap);
            return `https://maplestory.io/api/Character/${itemsUrl}/stand1/0/?renderMode=2`;
        },
		update,
		reset: () =>
			set({
				itemMap: {
					//뷰티
					Hair: ['68090', '허쉬 헤어', '0'],
					Face: ['50137', '차차 얼굴', '0'],
					Head: ['12016', '홍조 꽃잎 피부'],
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
					Earrings: ['null', 'null']
				},
				// itemMap을 json으로 encode하여 itemQueue에 저장해야 한다.
				itemQueue: [],
				itemQueueIndex: 0
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
