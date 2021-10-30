import { ItemModel } from "../models/item.model";

export class ItemsState {
    public items: ItemModel[] = [];
}

export enum ItemsActionType {
    ItemsDownloaded = "ItemsDownloaded",
    ItemAdded = "ItemAdded",
    ItemUpdated = "ItemUpdated",
    ItemDeleted = "ItemDeleted"
}

export interface ItemsAction {
    type: ItemsActionType; 
    payload: any;             
}

// Items Action Creators: 
export function ItemsDownloadedAction(downloadedItems: ItemModel[]): ItemsAction {
    return { type: ItemsActionType.ItemsDownloaded, payload: downloadedItems };
}
export function ItemAddedAction(addedItem: ItemModel): ItemsAction {
    return { type: ItemsActionType.ItemAdded, payload: addedItem };
}
export function ItemUpdatedAction(updatedItem: ItemModel): ItemsAction {
    return { type: ItemsActionType.ItemUpdated , payload: updatedItem };
}
export function ItemDeletedAction(deletedItemId: string): ItemsAction {
    return { type: ItemsActionType.ItemDeleted, payload: deletedItemId };
}


export function itemsReducer(currentState: ItemsState = new ItemsState(), action: ItemsAction): ItemsState {

    const newState = { ...currentState };


    switch (action.type) {
        case ItemsActionType.ItemsDownloaded:
            newState.items = action.payload; 
            break;
        case ItemsActionType.ItemAdded:
            newState.items.push(action.payload); 
            break;
        case ItemsActionType.ItemUpdated:
            const indexToUpdate = newState.items.findIndex(i => i._id === action.payload.id); 
            newState.items[indexToUpdate] = action.payload;
            break;
        case ItemsActionType.ItemDeleted:
            const indexToDelete = newState.items.findIndex(i => i._id === action.payload); 
            newState.items.splice(indexToDelete, 1);
            break;
    }

    return newState;
}
