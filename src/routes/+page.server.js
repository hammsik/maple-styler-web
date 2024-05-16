const baseUrl = 'https://maplestory.io/api/KMS/389/item';

const category = ['Character', 'Armor', 'Accessory'];
const subCategory = [
	['Hair', 'Face', 'Head'],
	['Hat', 'Overall', 'Cash', 'Top', 'Bottom', 'Cape', 'Glove', 'Shoes', 'Shield'],
	['Face Accessory', 'Eye Decoration', 'Earrings']
];

async function getItemList() {
	let itemList = [];
	for (let i = 0; i < category.length; i++) {
		let categoryList = [];
		for (let j = 0; j < subCategory[i].length; j++) {
			const response = await fetch(
				baseUrl +
					`?overallCategory=Equip&categoryFilter=${subCategory[i][j] === 'Cash' ? 'One-Handed Weapon' : category[i]}&subCategoryFilter=${subCategory[i][j]}`
			);
			if (!response.ok) {
				console.error(
					`Error fetching data from ${baseUrl + `/${category[i]}/${subCategory[i][j]}`}: ${response.status} ${response.statusText}`
				);
				continue;
			}
			const text = await response.text();
			try {
				const item = JSON.parse(text);
				console.log(item.length);
				let subCategoryList = [];
				for (let k = 0; k < item.length; k++) {
					// 검은색을 제외한 성형, 헤어 data 제거
                    if (subCategory[i][j] === 'Face' && item[k].id % 1000 >= 100) continue;
                    if (subCategory[i][j] === 'Hair' && item[k].id % 10 !== 0) continue;
					subCategoryList.push({
						id: item[k].id,
						name: item[k].name,
						type: item[k].typeInfo.subCategory
					});
				}
                console.log(item.length, subCategoryList.length, subCategory[i][j], subCategoryList[0]);
				categoryList.push({ name: subCategory[i][j], list: subCategoryList });
			} catch (error) {
				console.error(
					`Error parsing JSON from ${baseUrl + `/${category[i]}/${subCategory[i][j]}`}: ${error}`
				);
			}
		}
		itemList.push({ name: category[i], list: categoryList });
	}
	console.log('fetching item list completed:');
	// console.log(itemList[0], itemList[1], itemList[2]);
}

export function load() {
	getItemList();
}
