var base = {};
base.Page = "https://api.backand.com";
base.Obj = "/1/objects/";
base.Token = "";

base.UI = function () {
    return {
        //AjaxFormSubmit: function (form, callbackSuccess, callbackError) {
        //    var data = new FormData(form);
        //    data.append("__jqSubmit__", "S");
        //    $.ajax({
        //        url: $(form).attr("action"),
        //        type: 'POST',
        //        data: data,
        //        mimeType: "multipart/form-data",
        //        contentType: false,
        //        cache: false,
        //        processData: false,
        //        success: function (response) {
        //            if (jQuery.isFunction(callbackSuccess)) {
        //                callbackSuccess(response);
        //            }
        //        },
        //        error: function (xhr, status, error) {
        //            var data = eval("(" + xhr.responseText + ")");
        //            if (jQuery.isFunction(callbackError)) {
        //                callbackError(data);
        //            }
        //            else {
        //                base.UI.Alert(data.Message);
        //            }
        //        }
        //    });
        //},

        AjaxWS: function (url, data, callbackSuccess, callbackError) {
            $.ajax({
                url: url,
                type: 'POST',
                data: JSON.stringify(data),
                dataType: "json",
                mimeType: "multipart/form-data",
                contentType: "application/json; charset=utf-8",
                success: function (response) {
                    if (jQuery.isFunction(callbackSuccess)) {
                        callbackSuccess(response);
                    }
                },
                error: function (xhr, status, error) {
                    var data = eval("(" + xhr.responseText + ")");
                    if (jQuery.isFunction(callbackError)) {
                        callbackError(data);
                    }
                    else if (data != null) {
                        console.log(data);
                        base.UI.Alert(data.Message);
                    }
                }
            });
        },

        Ajax: function (url, data, type, callbackSuccess, callbackError, forToken) {
            if (type == null) {
                type == "POST"
            }

            if (!forToken) {
                data = JSON.stringify(data);
            }

            $.ajax({
                url: url,
                async: false,
                type: type,
                beforeSend: function (xhr) {
                    if (!forToken)
                        xhr.setRequestHeader('Authorization', "Bearer " + base.Token);
                },
                data: data,
                dataType: 'json',
                cache: false,
                success: function (response) {
                    if (jQuery.isFunction(callbackSuccess)) {
                        callbackSuccess(response);
                    }
                },
                error: function (xhr, status, error) {
                    if (jQuery.isFunction(callbackError)) {
                        callbackError(xhr, status, error);
                    }
                }
            });
        },

        SaveCookie: function (Token) {
            var dto = {};
            dto.Token = Token;
            base.UI.AjaxWS("../webservices/WebService.asmx/SaveToken", dto);
        },

        Alert: function (message) {
            //bootbox.dialog({
            //    message: "<div class='row'> " +
            //                "<div class='col-xs-1'><i class='fa fa-terminal' style='font-size: 25px; margin: 5px 15px;'></i></div>" +
            //                "<div class='col-xs-11'>" +
            //                    "<h4 style='' >" + message + "</h4>" +
            //                "</div>" +
            //             "</div>",
            //    title: "Alerta",
            //    onEscape: true,
            //    buttons: {
            //        success: {
            //            label: "OK",
            //            className: "btn-success",
            //        }
            //    }
            //});
        }
    };
}();

base.Status = function () {
    return {
        GetAll: function (callBack) {
            var url = base.Page + base.Obj + "status";
            var data = {
                //page: page
            };

            base.UI.Ajax(url, data, "GET", callBack);
        },
        Get: function (id, callBack) {
            var url = base.Page + base.Obj + "status/" + id;
            var data = {
                //id: id
            };

            base.UI.Ajax(url, data, "GET", callBack);
        },
        Create: function (status_name, callBack) {
            var url = base.Page + base.Obj + "status";
            var data = {
                status_name: status_name
            };

            base.UI.Ajax(url, data, "POST", callBack);
        },
        Update: function (id, status_name, callBack) {
            var url = base.Page + base.Obj + "status/" + id;
            var data = {
                //id: id,
                status_name: status_name
            };

            base.UI.Ajax(url, data, "PUT", callBack);
        },
        Delete: function (id, callBack) {
            var url = base.Page + base.Obj + "status/" + id;
            var data = {
                //id: id
            };

            base.UI.Ajax(url, data, "DELETE", callBack);
        }
    };
}();

base.Jedi = function () {
    return {
        GetAll: function (callBack) {
            var url = base.Page + base.Obj + "jedi";
            var data = {
                //page: page
            };

            base.UI.Ajax(url, data, "GET", callBack);
        },
        Get: function (id, callBack) {
            var url = base.Page + base.Obj + "jedi/" + id;
            var data = {
                //id: id
            };

            base.UI.Ajax(url, data, "GET", callBack);
        },
        Create: function (status, master, name, planet, callBack, callbackError) {
            var url = base.Page + base.Obj + "jedi";
            var data = {
                status: status,
                master: master,
                name: name,
                planet: planet
            };

            base.UI.Ajax(url, data, "POST", callBack, callbackError);
        },
        Update: function (id, status, master, name, planet, callBack) {
            var url = base.Page + base.Obj + "jedi/" + id;
            var data = {
                //id : id,
                status: status,
                master: master,
                name: name,
                planet: planet
            };

            base.UI.Ajax(url, data, "PUT", callBack);
        },
        Delete: function (id, callBack) {
            var url = base.Page + base.Obj + "jedi/" + id;
            var data = {
                //id: id
            };

            base.UI.Ajax(url, data, "DELETE", callBack);
        }
    };
}();