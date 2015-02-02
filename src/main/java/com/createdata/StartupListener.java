package com.createdata;

import java.io.FileWriter;
import java.util.Timer;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

/**
 * 测试数据
 * 
 * @author lKF15411
 * @since 2013-6-18 下午4:48:50
 * 
 */
public class StartupListener implements ServletContextListener {

    private static String vlPath0;

    private static String vlPath1;

    private static int count = 1;

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        vlPath0 = sce.getServletContext().getRealPath("/testdata/vehicleList0");
        vlPath1 = sce.getServletContext().getRealPath("/testdata/vehicleList1");
        startTask();
    }

    public static void changelnglat() throws Exception {
        FileWriter fw0 = new FileWriter(vlPath0);
        FileWriter fw1 = new FileWriter(vlPath1);
        Double lat01 = 23.13002;
        Double lng01 = 113.31572 + 0.0001 * count;
        Double lat02 = 23.12686;
        Double lng02 = 113.30993 + 0.0001 * count;
        Double lat11 = 23.13012 + 0.0001 * count;
        Double lng11 = 113.31562;
        Double lat12 = 23.12678;
        Double lng12 = 113.30983 + 0.0001 * count;
        int dir = count % 4;
        String dirct1 = "E";
        String dirct2 = "N";
        if (dir == 0) {
            dirct1 = "S";
            dirct2 = "E";
        } else if (dir == 1) {
            dirct1 = "W";
            dirct2 = "S";
        } else if (dir == 2) {
            dirct1 = "N";
            dirct2 = "W";
        } else if (dir == 3) {
            dirct1 = "E";
            dirct2 = "N";
        }
        String s0 = "{\"vehicles\":[{\"id\":\"1\",\"terminalId\":\"001\",\"remark\":\"truck_1\",\"longitude\":\"" + lng01 + "\",\"latitude\":\"" + lat01 + "\",\"status\":\"stop\",\"direction\":\"" + dirct1 + "\"},{\"id\":\"2\",\"terminalId\":\"002\",\"remark\":\"truck_2\",\"longitude\":\"" + lng02 + "\",\"latitude\":\"" + lat02 + "\",\"status\":\"driving\",\"direction\":\"" + dirct2 + "\"}]}";
        fw0.write(s0, 0, s0.length());
        String s1 = "{\"vehicles\":[{\"id\":\"3\",\"terminalId\":\"003\",\"remark\":\"truck_3\",\"longitude\":\"" + lng11 + "\",\"latitude\":\"" + lat11 + "\",\"status\":\"engineOff\",\"direction\":\"" + dirct1 + "\"},{\"id\":\"4\",\"terminalId\":\"004\",\"remark\":\"truck_4\",\"longitude\":\"" + lng12 + "\",\"latitude\":\"" + lat12 + "\",\"status\":\"ldlling\",\"direction\":\"" + dirct2 + "\"}]}";
        fw1.write(s1, 0, s1.length());
        fw0.flush();
        fw1.flush();
        fw0.close();
        fw1.close();
        count++;
    }

    public static void startTask() {
        Timer timer = new Timer();
        timer.schedule(new MyTask(), 1000, 3000);//在1秒后执行此任务,每次间隔2秒执行一次,如果传递一个Data参数,就可以在某个固定的时间执行这个任务.     
    }

    static class MyTask extends java.util.TimerTask {
        public void run() {
            try {
                changelnglat();
            } catch (Exception e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        // TODO Auto-generated method stub

    }
}
