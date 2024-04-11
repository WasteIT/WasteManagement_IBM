function list_child_processes () {
    local ppid=$1;
    local current_children=$(pgrep -P $ppid);
    local local_child;
    if [ $? -eq 0 ];
    then
        for current_child in $current_children
        do
          local_child=$current_child;
          list_child_processes $local_child;
          echo $local_child;
        done;
    else
      return 0;
    fi;
}

ps 23546;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 23546 > /dev/null;
done;

for child in $(list_child_processes 23573);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/edwardrostomian/Documents/GitHub/WasteManagement_IBM/src/bin/Debug/net7.0/71c16a63e93c4b2c82178d2fb1e84b9a.sh;
