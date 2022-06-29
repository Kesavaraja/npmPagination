
function Core(_props) {
    var props = _props
    console.log(props)
    const onValueChanged = (e) => {
        if ([e.target.name] === "pageNumber")
            props.onValueChanged(e.target.name, e.target.id);
        else {
            props.onValueChanged("pageNumber", "1");
            props.onValueChanged(e.target.name, e.target.value);
        }
    }

    const startCalc = (props) => {
        if (props.totalCount < 1)
            return 0
        return (Number(props.pageNumber) - 1) * props.countPerPage + 1
    }

    const endRowCalc = (props) => {
        var endValue = (Number(props.pageNumber)) * props.countPerPage
        var showingEndCalc = endValue >= props.totalCount ? props.totalCount : endValue
        return showingEndCalc
    }

    const renderOptions = (props) => {
        var pages = []
        var count = Math.ceil(props.totalCount / props.countPerPage);
        if (props.pageNumber > 3)
            pages[0] = <a key="0" className="paginate_button next" id={1} name="pageNumber" aria-controls="datatable" onClick={onValueChanged} data-dt-idx="3" tabIndex="0">First</a>
        if (props.pageNumber == "1")
            pages[1] = <a key="1" className="paginate_button previous disabled" aria-controls="datatable" id={Number(props.pageNumber) - 1} name="pageNumber" data-dt-idx="0" tabIndex="0">{"<"}</a>
        else
            pages[1] = <a key="1" className="paginate_button previous" aria-controls="datatable" id={Number(props.pageNumber) - 1} name="pageNumber" onClick={onValueChanged} data-dt-idx="0" tabIndex="0">{"<"}</a>
        for (let i = props.pageNumber - 2; i <= Number(props.pageNumber) + 2 && i <= count; i++) {
            if (i == props.pageNumber)
                pages[i] = <a key={i} className="paginate_button current" aria-controls="datatable" value={i} id={i} name="pageNumber" tabIndex="0"/*  onClick={onValueChanged} */>{i}</a>
            else if (i != 0)
                pages[i] = <a key={i} className="paginate_button " aria-controls="datatable" value={i} id={i} name="pageNumber" tabIndex="0" onClick={onValueChanged}>{i}</a>
        }
        if (count == props.pageNumber || props.totalCount == 0)
            pages[count + 1] = <a key={count + 1} className="paginate_button next disabled" id={Number(props.pageNumber) + 1} name="pageNumber" aria-controls="datatable" data-dt-idx="3" tabIndex="0">{">"}</a>
        else {
            pages[count + 1] = <a key={count + 1} className="paginate_button next" id={Number(props.pageNumber) + 1} name="pageNumber" aria-controls="datatable" onClick={onValueChanged} data-dt-idx="3" tabIndex="0">{">"}</a>
            pages[count + 2] = <a key={count + 2} className="paginate_button next" id={count} name="pageNumber" aria-controls="datatable" onClick={onValueChanged} data-dt-idx="3" tabIndex="0">Last</a>
        }

        return pages
    }

    var pages = ""
    pages = renderOptions(props)
    var startResult = startCalc(props)
    var endResult = endRowCalc(props)
    return (
        <div className="bottom">
            <div className="dataTables_info" id="datatable_info" role="status" aria-live="polite">Showing {startResult ? startResult : 0} to {endResult ? endResult : 0} of {props.totalCount ? props.totalCount : 0} entries</div>
            <div className="dataTables_length" id="datatable_length">
                <label>
                    Show
                    <select aria-controls="datatable" name="countPerPage" value={props.countPerPage} className="form-control input-sm" onChange={onValueChanged}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                    entries
                </label>
            </div>
            <div className="dataTables_paginate paging_simple_numbers" id="datatable_paginate">
                <ul className="pagination">
                    <span>
                        {pages}
                    </span>
                </ul>
            </div>
        </div>
    )
}
export default Core