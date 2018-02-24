
export const getLocalhostIP = () => {
    let RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
    if (!RTCPeerConnection) {
        console.warn("请使用主流浏览器：chrome,firefox,opera,safari");
        return;
    }
    (() => {
        let rtc = new RTCPeerConnection({iceServers: []});
        if (1 || window.mozRTCPeerConnection) {
            rtc.createDataChannel('', {reliable: false});
        }

        rtc.onicecandidate = (evt) => {
            if (evt.candidate) grepSDP('a=' + evt.candidate.candidate);
        };
        rtc.createOffer((offerDesc) => {
            grepSDP(offerDesc.sdp);
            rtc.setLocalDescription(offerDesc);
        }, (e) => {
            console.warn('offer failed', e);
        });


        let addrs = Object.create(null);
        addrs['0.0.0.0'] = false;

        const updateDisplay = (newAddr) => {
            if (newAddr in addrs) return;
            else addrs[newAddr] = true;
            let displayAddrs = Object.keys(addrs).filter((k) => {
                return addrs[k];
            });
            for(let i = 0; i < displayAddrs.length; i++){
                if(displayAddrs[i].length > 16){
                    displayAddrs.splice(i, 1);
                    i--;
                }
            }
            window.ips = displayAddrs[0];
        };

        const grepSDP = (sdp) => {
            sdp.split('\r\n').forEach((line) => {
                if (~line.indexOf("a=candidate")) {
                    let parts = line.split(' '),
                        addr = parts[4],
                        type = parts[7];
                    if (type === 'host') {
                        updateDisplay(addr);
                    }
                } else if (~line.indexOf("c=")) {
                    let parts = line.split(' '),
                        addr = parts[2];
                    updateDisplay(addr);
                }
            });
        };
    })();
};

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

export const shuffle = (ary) => {
    for (let i = 0; i < ary.length; i++) {
        let j = getRandomInt(0, i);
        let t = ary[i];
        ary[i] = ary[j];
        ary[j] = t;
    }
    return ary;
};
