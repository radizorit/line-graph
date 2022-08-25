async function fetchData() {
    try {
        // close: 21521
        // high: 21686
        // low: 20894
        // open: 21396
        // startTime: "2022-08-23T00:00:00+00:00"
        // time: 1661212800000
        // volume: 533474113.101
        const res = await fetch('https://ftx.com/api/markets/btc/usd/candles?resolution=86400&start_time=1661212800&end_time=1661299200');
        const record = await res.json();
        // console.log(record['result'][0]['open']);
        document.getElementById("ylow").innerHTML = record['result'][0]['low'];
        document.getElementById("yclose").innerHTML = record['result'][0]['close'];
        document.getElementById("yhigh").innerHTML = record['result'][0]['high'];
        document.getElementById("yopen").innerHTML = record['result'][0]['open'];
        document.getElementById("yvolume").innerHTML = record['result'][0]['volume'];


        document.getElementById("tlow").innerHTML = record['result'][1]['low'];
        document.getElementById("tclose").innerHTML = record['result'][1]['close'];
        document.getElementById("thigh").innerHTML = record['result'][1]['high'];
        document.getElementById("topen").innerHTML = record['result'][1]['open'];
        document.getElementById("tvolume").innerHTML = record['result'][1]['volume'];
    } catch (e) {
        console.log(e)
    }
    // document.getElementById("date").textContent = 'yes'
    // document.querySelector('button').onclick = function () { console.log('hello') }

    // document.getElementById("latestBy").innerHTML = record.data[0].latestBy;
    // document.getElementById("deathNew").innerHTML = record.data[0].deathNew;
}
fetchData();