package it.tfobz;

import org.apache.commons.io.IOUtils;
import org.json.JSONArray;
import org.json.JSONObject;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;

public class eChargingTest {
    public static void main(String[] args) throws UnirestException {

        Unirest.setTimeouts(0, 0);
        HttpResponse<String> response = Unirest
                .get("https://mobility.api.opendatahub.com/v2/flat,node/EChargingStation")
                .asString();

        JSONObject obj = new JSONObject(response.getBody());
        System.out.println(obj.getJSONArray("data").getJSONObject(0).getJSONObject("scoordinate").get("x"));
        System.out.println(obj.getJSONArray("data").getJSONObject(0).getJSONObject("scoordinate").get("y"));
    }
}
