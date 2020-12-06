class App {

    _tablesNumber
    _tables = []
    _interface

    constructor(tablesNumber) {
        log('Запуск приложения')

        this._tablesNumber = tablesNumber
        this._createTables()
        this._interface = new Interface()
        this._createUI()

        log('Приложение запущено', 'success')
        log(`Добавлено столов: ${this._tables.length}`)
    }

    _createTables() {
        log('Добавление столов')
        for (let tableNumber = 1; tableNumber <= this._tablesNumber; tableNumber++) {
            this._tables.push(new Table(tableNumber))
        }
    }

    _createUI() {
        log('Создание интерфейса')
        for (let table of this._tables) {
            this._interface.addTable(table)
        }
    }

}