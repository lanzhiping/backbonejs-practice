"use strict";

var data = {
    apiList: [
        { name: "Menu API", methods: ["getMenu", "removeMenu", "getMenuConfig", "createMenu"] }
    ]
};

function ApiIndexContainer(props) {
    return (
        <li className="label_item wxapi_index_item">
            <a className="label_inner" href="#menu-basic">{props.name}</a>
        </li>
    );
}

function ApiForm(props) {
    return (
        <li>
            <h3 id="menu-basic">{props.item.name}</h3>
            {props.item.methods.map((method) => {
                var handleClick = function(e) {
                    e.preventDefault();
                    $.ajax({
                        url: "/" + method,
                        method: method === "createMenu" ? "POST" : "GET",
                        success: (data) => {console.log(data)}
                    });
                };

                return (<button className="btn btn_primary" id={method} onClick={handleClick}>{method}</button>);
            })}
        </li>
    );
}

function MainContainer() {
    return (
        <div class="wxapi_container">
            <div className="wxapi_index_container">
                <ul className="label_box lbox_close wxapi_index_list">
                    {data.apiList.map((apiItem) => (
                        <ApiIndexContainer name={apiItem.name} />
                    ))}
                </ul>
            </div>
            <div className="lbox_close wxapi_form">
                <ul>
                    {data.apiList.map((apiItem) => (
                        <ApiForm item={apiItem} />
                    ))}
                </ul>
            </div>
        </div>
    );
}

ReactDOM.render(
    <MainContainer />,
    document.getElementById('root')
);
