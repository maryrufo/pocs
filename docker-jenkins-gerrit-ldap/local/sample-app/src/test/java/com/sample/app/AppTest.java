package com.sample.app;

import static org.junit.Assert.assertTrue;

import java.io.IOException;
import java.net.ServerSocket;

import org.junit.Test;

/**
 * Unit test for simple App.
 */
public class AppTest
{
	/**
	* Rigorous Test :-)
	 */
	@Test
	public void shouldAnswerWithTrue()
	{
		try {
			final Integer PORT = 1025;
			ServerSocket mysSocket = new ServerSocket(PORT);

			Integer SECONDS_TO_SLEEP = 5;

			System.out.println("Sleep in " + SECONDS_TO_SLEEP + " seconds..");
			System.out.println("Check port.. " + " sudo lsof -t -i:" + PORT);
			Thread.sleep(SECONDS_TO_SLEEP * 1000);
			System.out.println("Done.");

			assertTrue(true);
		} catch (IOException e) {
			e.printStackTrace();
			assertTrue(false);
		} catch (InterruptedException e) {
			e.printStackTrace();
			assertTrue(false);
		}
    }
}
