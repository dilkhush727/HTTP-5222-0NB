const trakt = "https://api.trakt.tv"; //base URL for any Trakt API requests

async function getAnticipatedShows() {
    let reqUrl = `${trakt}/shows/anticipated?page=1&limit=15`;
    console.log(reqUrl);
    var response = await fetch(
        reqUrl,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "trakt-api-version": 2,
                "X-Pagination-Limit": 15,
                "trakt-api-key": process.env.TRAKT_CLIENT_ID
            }
        }
    );
    return await response.json();
}
module.exports = {
    getAnticipatedShows
};