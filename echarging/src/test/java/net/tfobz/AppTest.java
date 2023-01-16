package net.tfobz;

import org.json.JSONArray;
import org.json.JSONObject;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;

import static spark.Spark.*;

import spark.Request;
import spark.Response;
import spark.Route;

public class AppTest {
    public static void main(String[] args) throws UnirestException {
        //Unirest.setTimeouts(0, 0);
        //        HttpResponse<String> res = Unirest
        //                .get("https://mobility.api.opendatahub.com/v2/flat,node/EChargingStation")
        //                .asString();
        //        JSONObject obj = new JSONObject(res.getBody());
        //        final int length = obj.getJSONArray("data").length();
        port(4567);
        get("/", new Route() {
            @Override
            public Object handle(Request request, Response response) throws Exception {
                //String string = "";
                //for (int i = 0; i < length; i++) {
                    EchargingMain main = new EchargingMain(0);
                    return main.isActive() + ";" + main.isAvailable() + ";" + main.getCode() + ";"
                            + main.getX() + ";"
                            + main.getY() + ";" + main.getCity() + ";" + main.getState() + ";" + main.getAddress() + ";"
                            + main.getCapacity() + ";" + main.getProvider() + ";" + main.getName() + ";"
                            + main.getOrigin();
                //}
                //return string;
            }
        });
    }
}