interface LocalStorageDB {
  /**
   * Проверка на наличие записи по ключу.
   * 
   * !Важно совершать ее перед каждым
   * обращением к методам get/set/update(Item)
   * во избежании ошибок времени выполнения
   */
  isItemInDB (key: string): boolean;
  getItem (key: string): any;
  getAll (): any[];
  setItem (key: string, value: any): void;
  updateItem (key: string, value: any): void;
  removeItem (key: string): void;
}

class LocalStorageDBImplementation<T> implements LocalStorageDB {
  private prefix: string
  
  constructor (keyPrefix: string = 'item-') {
    if (!window?.localStorage) {
      throw new ReferenceError('It doesn\'t work outside Browser LocalStorage API')
    }

    this.prefix = keyPrefix
  }
  
  isItemInDB (key: string): boolean {
    return localStorage.getItem(this.prefix + key) !== null
  }

  getItem (key: string): T {
    const item = localStorage.getItem(this.prefix + key)
    if (!item) {
      throw new Error('Nothing stored with key: ' + key)
    }
    return JSON.parse(item)
  }

  getAll (): T[] {
    return Object.getOwnPropertyNames(localStorage)
      .filter(key => key.startsWith(this.prefix))
      .map(key => JSON.parse(localStorage.getItem(key) as string))
  }

  setItem (key: string, value: T): void {
    const stringifiedValue = JSON.stringify(value)
    localStorage.setItem(this.prefix + key, stringifiedValue)
  }

  /**
   * Работает только для записей с типом Object, Array
   * Для других необходимо перезаписать метод
   * @param key 
   * @param value 
   */
  updateItem (key: string, value: T): void {
    const item = JSON.parse(localStorage.getItem(this.prefix + key) as string)
    let updatedItem: any

    if (Array.isArray(item) && Array.isArray(value)) {
      updatedItem = [...item, ...value]
    } else if (typeof item === 'object') {
      updatedItem = Object.assign(item, value)
    }

    localStorage.setItem(this.prefix + key, JSON.stringify(updatedItem))
  }

  removeItem (key: string): void {
    localStorage.removeItem(this.prefix + key)
  }
}

export {
  LocalStorageDBImplementation
}