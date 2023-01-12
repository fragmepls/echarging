package it.tfobz;

import java.util.ArrayList;
import java.util.List;

public class eChargingWrapperStorage {

    private List<eChargingWrapper> list;

    public List<eChargingWrapper> getList() {
        if (list == null) {
            list = new ArrayList<>();
        }
        return list;
    }

    public void setEmployeeList(List<eChargingWrapper> list) {
        this.list = list;
    }
}
