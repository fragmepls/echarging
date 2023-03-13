package net.tfobz;

import org.json.JSONObject;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;

public class AppTest {
    public static void main(String[] args) throws UnirestException {
        Unirest.setTimeouts(0, 0);
        JSONObject obj = null;
        try {
            HttpResponse<String> response = Unirest
                    .get("https://mobility.api.opendatahub.com/v2/flat,node/EChargingStation")
                    .asString();
            obj = new JSONObject(response.getBody());
        } catch (UnirestException e) {
            System.out.println(e.getMessage());
        }
        int length = obj.getJSONArray("data").length();
        for (int i = 0; i < length; i++) {
            EchargingMain main = new EchargingMain(i);
            System.out.println(main.isActive() + ";" + main.isAvailable() + ";" +
                    main.getCode() + ";" + main.getX()
                    + ";" + main.getY() + ";" + main.getCity() + ";" + main.getState() + ";" +
                    main.getAddress() + ";"
                    + main.getCapacity() + ";" + main.getProvider() + ";" + main.getName() + ";"
                    + main.getOrigin());
        }
    }
}