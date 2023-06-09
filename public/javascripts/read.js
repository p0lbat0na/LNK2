



const searchForm = document.getElementById('searchForm');



let amount_of_records = document.getElementById('amount_of_record').textContent;

let searchBtns = []
if (document.title.slice(0, 9) != "Испытания") {
    for (let i = 0; i < amount_of_records; i++) {
        searchBtns[i] = document.getElementById('search' + [i]);


    }
}
searchBtns[amount_of_records] = document.getElementById('search' + amount_of_records);

searchBtns.forEach(function (element, index) {
    element.addEventListener('click', event => {
        try {
            event.preventDefault();           

            let url = '/';
            let urlFull = '/'

            let requires_processing = false;
            let diagonal_dir = false;
            let num = -1;
            try {
                if (element.className == "btn waves-effect waves-light btn-small" || document.title.slice(0, 9) == "Испытания") {
                    if (document.title.slice(0, 9) == "Испытания" && element.className != "waves-effect waves-light btn-small") {
                        num = document.getElementById('num_input' + amount_of_records).value;
                        //url = url + window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
                        urlFull = document.getElementById('refresh').href;
                        url = urlFull.substring(urlFull.lastIndexOf('/'))
                        diagonal_dir = false;
                        if (document.getElementById('requires_processing').checked)
                            requires_processing = true;

                    } else {
                        num = document.getElementById('num' + index).innerHTML;
                        
                        urlFull = document.getElementById('diagonal').href;
                        url = urlFull.substring(urlFull.lastIndexOf('/'))
                        diagonal_dir = true;
                    }

                }
                else {

                    urlFull = document.getElementById('refresh').href;
                    url = urlFull.substring(urlFull.lastIndexOf('/'))
                    num = document.getElementById('num_input'+amount_of_records).value;
                    if (document.getElementById('requires_processing').checked)
                        requires_processing = true;
                }
                if (element.className == "waves-effect waves-light btn-small" && document.title.slice(0, 9) == "Испытания") {
                    url = url + window.location.href.substring(window.location.href.lastIndexOf('/') + 1);

                    diagonal_dir = false;
                    if (document.getElementById('requires_processing').checked)
                        requires_processing = true;
                }

            }
            catch (e) {
                alert(e)
            }
            if (url[url.length - 1] == "?") {
                url = url.slice(0, url.length - 1);
        }
        
            url = url + '/search'
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    num: num,
                    requires_processing: requires_processing,
                    diagonal_dir: diagonal_dir
                })
            })
                .then(res => res.text())
                .then(data => {
                    if (data.length < 200)
                        alert(data);
                    else {
                        const newWindow = window.open();
                        newWindow.document.write(data);
                    }
                })
                .catch(error => {
                    console.error(error);
                    alert(error);
                    });
        } catch (e) {
            alert(e);
        }
        });
});

