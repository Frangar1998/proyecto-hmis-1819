package testsAceptacionProyecto;

import java.util.regex.Pattern;
import java.util.concurrent.TimeUnit;
import org.junit.*;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;
import org.openqa.selenium.*;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.htmlunit.HtmlUnitDriver;
import org.openqa.selenium.support.ui.Select;

public class RegistroCorrecto {
  private WebDriver driver;
  private String baseUrl;
  private boolean acceptNextAlert = true;
  private StringBuffer verificationErrors = new StringBuffer();

  @Before
  public void setUp() throws Exception {
    //driver = new FirefoxDriver();
	  driver = new HtmlUnitDriver();
    baseUrl = "https://www.katalon.com/";
    driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
  }

  @Test
  public void testRegistroCorrecto() throws Exception {
	  String userRandom = "";
	  String emailRandom = "";
    driver.get("http://localhost:4200/auth/login");
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='Login'])[1]/following::button[1]")).click();
    // ERROR: Caught exception [ERROR: Unsupported command [getEval |  | ]]
    driver.findElement(By.id("register-username")).click();
    driver.findElement(By.id("register-username")).clear();
    driver.findElement(By.id("register-username")).sendKeys(userRandom);
    // ERROR: Caught exception [ERROR: Unsupported command [getEval |  | ]]
    driver.findElement(By.id("register-email")).click();
    driver.findElement(By.id("register-email")).clear();
    driver.findElement(By.id("register-email")).sendKeys(emailRandom);
    driver.findElement(By.id("register-password")).click();
    driver.findElement(By.id("register-password")).clear();
    driver.findElement(By.id("register-password")).sendKeys("123456");
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='Crear cuenta nueva'])[1]/following::input[4]")).click();
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='Salir'])[1]/preceding::div[1]")).click();
    assertEquals("Bienvenid@", driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='Salir'])[1]/preceding::div[1]")).getText());
    driver.findElement(By.xpath("//body")).click();
  }

  @After
  public void tearDown() throws Exception {
    driver.quit();
    String verificationErrorString = verificationErrors.toString();
    if (!"".equals(verificationErrorString)) {
      fail(verificationErrorString);
    }
  }

  private boolean isElementPresent(By by) {
    try {
      driver.findElement(by);
      return true;
    } catch (NoSuchElementException e) {
      return false;
    }
  }

  private boolean isAlertPresent() {
    try {
      driver.switchTo().alert();
      return true;
    } catch (NoAlertPresentException e) {
      return false;
    }
  }

  private String closeAlertAndGetItsText() {
    try {
      Alert alert = driver.switchTo().alert();
      String alertText = alert.getText();
      if (acceptNextAlert) {
        alert.accept();
      } else {
        alert.dismiss();
      }
      return alertText;
    } finally {
      acceptNextAlert = true;
    }
  }
}
