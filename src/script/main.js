import jquery from './jquery.2.1.3';

export class MainClass {

    constructor() {
        window.$ = window.jQuery = jquery
    }  
    request(url, param, calback) {
        $.ajax({
            url: url,
            dataType: 'json',
            type: 'get',
            data: param,
            success: function (ress) {
                calback(ress);
            },
            error: function (err) {
                calback(err);
            }
        });
    }

    fileUpload(url, param, calback){
        $.ajax({
            url: url,
            processData: false,
            contentType: false,
            data: param,
            type: 'POST',
            success: function(res){
                calback(res);
            },
            error : function(e){
                calback(e);
            }
        });
    }
}