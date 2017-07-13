<%@ WebService Language="C#" Class="WebService" %>

using System.Web.Services;

[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
[System.Web.Script.Services.ScriptService]
public class WebService : System.Web.Services.WebService {
    public WebService() {
    }

    //Este metodo ainda não está funcionando
    [WebMethod(EnableSession = true)]
    public void SaveToken(string Token) {
        Context.Response.Cookies.Set(new System.Web.HttpCookie("token", Token));
    }
}
