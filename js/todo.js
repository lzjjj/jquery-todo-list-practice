$(document)
    .ready(function () {
        let todoList = [];
        let filterList = [
            { "dataFilter": "all", isSelect: true, content: "All" },
            { "dataFilter": "active", isSelect: false, content: "Active" },
            { "dataFilter": "complete", isSelect: false, content: "Complete" }
        ];
        function generateUUID() {
            /*jshint bitwise:false */
            var i,
                random;
            var uuid = '';

            for (i = 0; i < 32; i++) {
                random = Math.random() * 16 | 0;
                if (i === 8 || i === 12 || i === 16 || i === 20) {
                    uuid += '-';
                }
                uuid += (i === 12
                    ? 4
                    : (i === 16
                        ? (random & 3 | 8)
                        : random)).toString(16);
            }
            return uuid;
        }
        renderTodoList = () => {
            return todoList.map(i => {
                return `<li id="${i.id}" class="${i.isChecked ? 'checked' : ''}" ondblclick="editItem(event, '${i.id}')">
                <input name="done-todo" type="checkbox" class="done-todo"> ${i.content} </li>`
            })
        }
        renderFiltersList = () => {
            return filterList.map(i => {
                return `<li>
                <a href="#" data-filter="${i.dataFilter}" class="${i.isSelect ? 'selected' : ''}" >${i.content}</a>
            </li>`
            })
        }
        renderToForm = () => {
            return `<div>
            <input class="input-text" type="text" name="ListItem" data-com.agilebits.onepassword.user-edited="yes">
            <div id="button" onclick="addItem()">Add</div>
        </div>
        <br>
        <ol>
        ${renderTodoList().join("")}
        </ol>
        <div>
            <ul id="filters">
               ${renderFiltersList().join("")}
            </ul>

        </div>`
        }
        render = () => {
            $("#todoForm").html(renderToForm());
        }

        addItem = () => { // add function
            if ($(".input-text").val()) {
                todoList.push({ id: generateUUID(), content: $(".input-text").val(), isChecked: false })
                render();
            } else {
                alert("请填写添加内容");
            }

        }

        $(document).on("change", ".done-todo", function (event) { //on the change of check
            if ($(this).is(":checked")) {
                $(this).parent().addClass("checked");
            } else {
                $(this).parent().removeClass("checked");
            }
        });
        $(document).on("click", "#filters a", function () { //hide different block

            if ($(this).attr("data-filter") == "active") {

                $('ol').children().filter('.checked').css('display', 'none');
                $('ol').children().not('.checked').css('display', '');
            }
            if ($(this).attr("data-filter") == "all") {
                $('ol').children().css('display', '');
            }
            if ($(this).attr("data-filter") == "complete") {
                $('ol').children().filter('.checked').css('display', '');
                $('ol').children().not(".checked").css('display', 'none');
            }
        });


        window.editItem = (event, viewId) => {
            $(event.target).attr('contentEditable', 'true')
                .focus()
                .keypress(function (event) {
                    var keycode = (event.keyCode
                        ? event.keyCode
                        : event.which);

                    if (keycode == '13') {
                        todoList.find(element => element.id === viewId).name = $(event.target).text();
                        render();
                    }

                })
        }
        render();
    });
