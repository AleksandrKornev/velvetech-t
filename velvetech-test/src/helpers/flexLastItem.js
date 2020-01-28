export default function formatItems(items, elInRow = 3) {
  if (!items) return [];

  const formatedItems = items;
  formatedItems.push({ newItem: true });

  const isNonNeedFormat = items.length % elInRow == 0;
  
  if (isNonNeedFormat) return items;
  
  const difference = elInRow - items.length % elInRow; 

  for (let i = 0; i < difference; i++) {
    formatedItems.push({ isHidden: true });
  }

  return formatedItems;
}
