

function bindLogoutButton() {
    const BtnLogout = document.querySelector('#btn_logout');
    BtnLogout.addEventListener('click', logout);
}
function getToken(){
    return localStorage.getItem('token');
}
async function getUearBytoken(token){
    try{
        const res = await axios.get('https://api.marktube.tv/vl/me',{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    }catch (error){
        console.log('getUearByToken error' , error);
        return null;
    }
}
async function getBooks(token){
    try{
        const res = await axios.get('https://api.marktube.tv/vl/me',{
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        return res.data;
    }catch(error){
        console.log('getBooks error', error);
        return null;
    }
}
function render(books){
    const listElement = document.querySelector('#list');
}




async function main(){
    // 버튼에 이벤트 연결
    bindLogoutButton();
    // 토큰체크
    const token = getToken();
    if(token === null){
        location.assign('/login');
        return;
    }
    // 토큰으로 서버에서 나의 정보 받아오기
    const user = await getUearBytoken(token);
    if (user === null){
        localStorage.clear();
        location.assign('/login');
        return;
    }
    // 나의 책을 서버에서 받아오기
    const books = await getBooks(token);
    if(books === null){
        return;
    }
    // 받아온 책을 그리기
    render();
}


document.addEventListener('DOMContentloaded', main);